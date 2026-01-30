from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import CartItem, Cart
from products.models import Product
from .serializers import CartSerializer


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = request.user.cart
        serializer = CartSerializer(cart)
        return Response(serializer.data)




class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)

        if not product_id:
            return Response(
                {"error": "product_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quantity = int(quantity)
        except ValueError:
            return Response(
                {"error": "quantity must be an integer"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if quantity < 1:
            return Response(
                {"error": "quantity must be >= 1"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        cart, _ = Cart.objects.get_or_create(user=request.user)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity

        item.save()

        return Response(
            {"message": "Product added to cart"},
            status=status.HTTP_200_OK
        )
