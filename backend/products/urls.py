from rest_framework.routers import SimpleRouter
from .views import ProductViewSet, ProductReviewViewSet

router = SimpleRouter()
router.register("reviews", ProductReviewViewSet, basename="product-reviews")
router.register("", ProductViewSet, basename="products")

urlpatterns = router.urls
