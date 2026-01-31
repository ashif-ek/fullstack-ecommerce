from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "items"]


class CartItemUpdateSerializer(serializers.Serializer):
    cart_item_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=0)

    def save(self):
        user = self.context["user"]
        cart_item = CartItem.objects.get(
            id=self.validated_data["cart_item_id"],
            cart__user=user
        )

        qty = self.validated_data["quantity"]

        if qty == 0:
            cart_item.delete()
        else:
            cart_item.quantity = qty
            cart_item.save()

        return cart_item
