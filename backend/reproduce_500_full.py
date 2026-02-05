import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.conf import settings

settings.ALLOWED_HOSTS += ["testserver"]

from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status
from accounts.admin_views import AdminProductViewSet
from accounts.models import User
from products.models import Product

# Setup
factory = APIRequestFactory()
user = User.objects.filter(email="adminx@gmail.com").first()
if not user:
    print("User adminx@gmail.com not found. Using first staff user.")
    user = User.objects.filter(is_staff=True).first()

if not user:
    print("No staff user found!")
    exit(1)

# Ensure a product exists
if not Product.objects.exists():
    Product.objects.create(name="Test Product", price=10.00, stock=10)

# Request
view = AdminProductViewSet.as_view({"get": "list"})
request = factory.get("/api/admin/products/")
force_authenticate(request, user=user)

try:
    response = view(request)
    print(f"Status Code: {response.status_code}")
    if response.status_code != 200:
        print(f"Error: {response.data}")
    else:
        print("Success!")
        # Print first item keys to see if category is there
        if len(response.data) > 0:
            print("Response Keys:", response.data[0].keys())

except Exception as e:
    import traceback

    traceback.print_exc()
