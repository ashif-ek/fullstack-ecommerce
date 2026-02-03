import os
import django
import sys

sys.path.append("d:/fullstack-ecommerce/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from rest_framework.test import APIClient
from accounts.models import User


def verify_view():
    print("--- STARTING VERIFICATION ---")
    try:
        user = User.objects.get(pk=6)
        print(f"User 6 found: {user.email}")
    except User.DoesNotExist:
        print("User 6 NOT FOUND. Using first user.")
        user = User.objects.first()
        if user:
            print(f"Using user: {user.pk} - {user.email}")
        else:
            print("NO USERS IN DB!")
            return

    client = APIClient()
    client.force_authenticate(user=user)

    # Try exact URL
    url = f"/api/users/{user.pk}/"
    print(f"\nTesting GET {url}")
    # Explicitly set host to bypass ALLOWED_HOSTS check
    response = client.get(url, HTTP_HOST="127.0.0.1")
    print(f"Status Code: {response.status_code}")

    if response.status_code == 200:
        print("SUCCESS 200 OK")
        data = response.json()
        print("Data keys:", data.keys())
        if "orders" in data and len(data["orders"]) > 0:
            print("Sample Order:", data["orders"][0])
            if "items" in data["orders"][0] and len(data["orders"][0]["items"]) > 0:
                print("Sample Item:", data["orders"][0]["items"][0])
        else:
            print("No orders found for this user")
    else:
        print("Failed!")
        try:
            print("JSON Response:", response.json())
        except:
            print("Content:", response.content[:500])


if __name__ == "__main__":
    verify_view()
