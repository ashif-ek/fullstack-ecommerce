# payments/models.py
from django.db import models
from orders.models import Order

class Payment(models.Model):
    STATUS_SUCCESS = "SUCCESS"
    STATUS_FAILED = "FAILED"

    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20)
    reference_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
