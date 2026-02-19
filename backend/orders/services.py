from decimal import Decimal
from django.db import transaction
from django.core.exceptions import ValidationError

from cart.models import CartItem
from .models import Order, OrderItem


@transaction.atomic
def create_order_from_cart(user):
    cart_items = (
        CartItem.objects.select_for_update()
        .select_related("product", "cart")
        .filter(cart__user=user)
    )

    if not cart_items.exists():
        raise ValidationError("Cart is empty")

    total_amount = Decimal("0.00")
    for item in cart_items:
        total_amount += item.product.price * item.quantity

    order = Order.objects.create(
        user=user, total_amount=total_amount, status=Order.STATUS_CREATED
    )

    OrderItem.objects.bulk_create(
        [
            OrderItem(
                order=order,
                product_id=item.product.id,
                product_name=item.product.name,
                unit_price=item.product.price,
                quantity=item.quantity,
                line_total=item.product.price * item.quantity,
            )
            for item in cart_items
        ]
    )

    #  DO NOT DELETE CART HERE
    return order
