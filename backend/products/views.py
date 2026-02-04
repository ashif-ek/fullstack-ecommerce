from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import filters
from django.db.models import Sum
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Product
from .serializers import ProductSerializer
from orders.models import OrderItem


# admin
from .serializers import AdminProductSerializer

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.filter(is_active=True).order_by("id")
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description", "category__name"]

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
        products = Product.objects.filter(id__in=top_product_ids, is_active=True)

        # 4. (Optional) Sort products list to match the sales order
        #    Because "WHERE id IN (...)" doesn't guarantee order.
        products_dict = {p.id: p for p in products}
        ordered_products = []
        for pid in top_product_ids:
            if pid in products_dict:
                ordered_products.append(products_dict[pid])

        serializer = self.get_serializer(ordered_products, many=True)
        return Response(serializer.data)



class AdminProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = AdminProductSerializer
    permission_classes = [IsAdminUser]