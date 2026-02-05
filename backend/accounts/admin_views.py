from rest_framework import viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum

from .models import User
from products.models import Product
from orders.models import Order

from .serializers import AdminUserSerializer, AdminOrderSerializer
from products.serializers import AdminProductSerializer
from .permissions import IsAdminUserStrict


class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-created_at")
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUserStrict]
    filter_backends = [filters.SearchFilter]
    search_fields = ["email", "username"]
    pagination_class = None


class AdminProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = AdminProductSerializer
    permission_classes = [IsAdminUserStrict]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description"]
    pagination_class = None

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__name=category)
        return queryset


class AdminOrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdminUserStrict]
    filter_backends = [filters.SearchFilter]
    search_fields = ["id", "user__email", "status"]
    pagination_class = None


class AdminAnalyticsView(APIView):
    permission_classes = [IsAdminUserStrict]

    def get(self, request):
        total_users = User.objects.count()
        total_products = Product.objects.count()
        total_orders = Order.objects.count()
        total_revenue = (
            Order.objects.aggregate(total_revenue=Sum("total_amount"))["total_revenue"]
            or 0
        )

        return Response(
            {
                "total_users": total_users,
                "total_products": total_products,
                "total_orders": total_orders,
                "total_revenue": total_revenue,
            }
        )
