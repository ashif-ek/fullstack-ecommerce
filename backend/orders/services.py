from decimal import Decimal
from django.db import transaction
from django.core.exceptions import ValidationError

from carts.models import CartItem
from .models import Order, OrderItem


@transaction.atomic
def create_order_from_cart(user):
    cart_items = (
        CartItem.objects
        .select_for_update()
        .select_related("product")
        .filter(user=user)
    )

    if not cart_items.exists():
        raise ValidationError("Cart is empty")

    total_amount = Decimal("0.00")

    for item in cart_items:
        total_amount += item.product.price * item.quantity

    order = Order.objects.create(
        user=user,
        total_amount=total_amount,
        status=Order.STATUS_CREATED
    )

    order_items = []
    for item in cart_items:
        order_items.append(
            OrderItem(
                order=order,
                product_id=item.product.id,
                product_name=item.product.name,
                unit_price=item.product.price,
                quantity=item.quantity,
                line_total=item.product.price * item.quantity,
            )
        )

    OrderItem.objects.bulk_create(order_items)
    cart_items.delete()

    return order
