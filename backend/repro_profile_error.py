import os
import django
import sys

sys.path.append("d:/fullstack-ecommerce/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User
from accounts.serializers import UserSerializer
from orders.models import Order


def reproduce():
    print("reproducing...")
    # Get a user, hopefully ID 6 exists as per screenshot, if not pick first
    try:
        user = User.objects.get(pk=6)
    except User.DoesNotExist:
        print("User 6 not found, picking first user")
        user = User.objects.first()

    if not user:
        print("No users found")
        return

    print(f"User: {user}")

    # Try to serialize
    try:
        serializer = UserSerializer(user)
        print("Serializer data:", serializer.data)
    except Exception as e:
        print("CRASHED during serialization:")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    reproduce()
