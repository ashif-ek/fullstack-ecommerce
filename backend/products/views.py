from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Avg, Count, Q
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticatedOrReadOnly
from .models import Product, ProductReview
from .serializers import ProductSerializer, ProductReviewSerializer
from orders.models import OrderItem
from .permissions import IsOwnerOrReadOnly

# admin
from .serializers import AdminProductSerializer


from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


class ProductViewSet(ModelViewSet):
    @method_decorator(cache_page(60 * 5))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    queryset = (
        Product.objects.prefetch_related("images")
        .annotate(
            average_rating=Avg("reviews__rating", filter=Q(reviews__is_approved=True)),
            total_reviews=Count("reviews", filter=Q(reviews__is_approved=True)),
        )
        .filter(is_active=True)
        .order_by("id")
    )
    serializer_class = ProductSerializer
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["price", "created_at", "average_rating", "total_reviews"]
    filterset_fields = ["category"]

    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            return [IsAdminUser()]
        return [AllowAny()]

    @action(detail=False, methods=["get"])
    def top_selling(self, request):
        # 1. Aggregate sales by product_id from OrderItem
        #    Sum up 'quantity' for each product_id
        top_sales = (
            OrderItem.objects.values("product_id")
            .annotate(total_sold=Sum("quantity"))
            .order_by("-total_sold")
        )

        # 2. Extract the product IDs of the top N sellers
        #    Let's take top 10 for example, or limit can be a query param
        limit = int(request.query_params.get("limit", 5))
        top_product_ids = [item["product_id"] for item in top_sales[:limit]]

        # 3. Fetch the actual Product objects
        #    Preserve the order of ids is tricky in SQL 'IN' clause usually,
        #    but for a small list, we can sort in Python or just return them.
        #    Let's filter for active ones too.
        products = self.get_queryset().filter(id__in=top_product_ids)

        # 4. (Optional) Sort products list to match the sales order
        #    Because "WHERE id IN (...)" doesn't guarantee order.
        products_dict = {p.id: p for p in products}
        ordered_products = []
        for pid in top_product_ids:
            if pid in products_dict:
                ordered_products.append(products_dict[pid])

        serializer = self.get_serializer(ordered_products, many=True)
        return Response(serializer.data)


class ProductReviewViewSet(ModelViewSet):
    serializer_class = ProductReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        return ProductReview.objects.filter(is_approved=True).select_related(
            "user", "product"
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AdminProductViewSet(ModelViewSet):
    queryset = Product.objects.prefetch_related("images").all()
    serializer_class = AdminProductSerializer
    permission_classes = [IsAdminUser]
