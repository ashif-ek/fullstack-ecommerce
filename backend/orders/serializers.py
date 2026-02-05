from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product_id",
            "product_name",
            "unit_price",
            "quantity",
            "line_total",
            "product_image",
        ]

    def get_product_image(self, obj):
        from products.models import Product

        try:
            product = Product.objects.get(id=obj.product_id)
            if product.image:
                return product.image.url
        except Product.DoesNotExist:
            pass
        return None


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    payment_id = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "total_amount",
            "created_at",
            "items",
            "payment_id",
            "user_email",
        ]

    user_email = serializers.SerializerMethodField()

    def get_user_email(self, obj):
        return obj.user.email if obj.user else "Unknown"

    def get_payment_id(self, obj):
        if hasattr(obj, "payment"):
            return obj.payment.reference_id
        return None
