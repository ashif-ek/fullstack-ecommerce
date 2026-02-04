from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

from .views import AdminProductViewSet


router = DefaultRouter()
router.register("products", ProductViewSet)
router.register("admin/products", AdminProductViewSet, basename="admin-products")


urlpatterns = router.urls


