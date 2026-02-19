from django.core.exceptions import ValidationError
from django.conf import settings
from django.db import models


class Order(models.Model):
    STATUS_CREATED = "CREATED"
    STATUS_PAYMENT_INITIATED = "PAYMENT_INITIATED"
    STATUS_PAID = "PAID"
    STATUS_SHIPPED = "SHIPPED"
    STATUS_DELIVERED = "DELIVERED"
    STATUS_CANCELLED = "CANCELLED"

    STATUS_CHOICES = [
        (STATUS_CREATED, "Created"),
        (STATUS_PAYMENT_INITIATED, "Payment Initiated"),
        (STATUS_PAID, "Paid"),
        (STATUS_SHIPPED, "Shipped"),
        (STATUS_DELIVERED, "Delivered"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders"
    )
    shipping_address = models.TextField(null=True, blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_CREATED, db_index=True
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user}"

    def save(self, *args, **kwargs):
        if self.pk:
            old_order = Order.objects.get(pk=self.pk)
            old_status = old_order.status
            new_status = self.status

            if (
                old_status == self.STATUS_DELIVERED
                and new_status == self.STATUS_CANCELLED
            ):
                raise ValidationError("Cannot cancel a delivered order.")

            if (
                old_status == self.STATUS_SHIPPED
                and new_status == self.STATUS_CANCELLED
            ):
                raise ValidationError("Cannot cancel a shipped order.")

        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)

    # SNAPSHOT FIELDS (IMPORTANT)
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=255)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    quantity = models.PositiveIntegerField()
    line_total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"
