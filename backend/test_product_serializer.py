import os
import django
from rest_framework import serializers

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from products.models import Product, Category
from products.serializers import AdminProductSerializer

# Create a product with no category if not exists
if not Product.objects.filter(name="No Category Product").exists():
    Product.objects.create(
        name="No Category Product",
        description="Test",
        price=10.00,
        stock=10,
        category=None,
    )

product = Product.objects.filter(category__isnull=True).first()
if product:
    print(
        f"Testing serializer with product: {product.name} (Category: {product.category})"
    )
    try:
        serializer = AdminProductSerializer(product)
        print(serializer.data)
    except Exception as e:
        print(f"CRASH: {e}")
else:
    print("No product with null category found to test.")
