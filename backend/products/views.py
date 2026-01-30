from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [AllowAny()]
