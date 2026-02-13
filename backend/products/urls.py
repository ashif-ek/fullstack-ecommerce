from rest_framework.routers import SimpleRouter
from .views import ProductViewSet

router = SimpleRouter()
router.register("", ProductViewSet, basename="products")

urlpatterns = router.urls
