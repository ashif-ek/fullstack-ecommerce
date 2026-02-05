from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .admin_views import (
    AdminUserViewSet,
    AdminProductViewSet,
    AdminOrderViewSet,
    AdminAnalyticsView,
)

router = SimpleRouter()
router.register(r"users", AdminUserViewSet, basename="admin-users")
router.register(r"products", AdminProductViewSet, basename="admin-products")
router.register(r"orders", AdminOrderViewSet, basename="admin-orders")

urlpatterns = [
    path("analytics/", AdminAnalyticsView.as_view(), name="admin-analytics"),
    path("", include(router.urls)),
]
