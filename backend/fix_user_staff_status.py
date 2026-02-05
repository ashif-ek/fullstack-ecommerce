import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User

email = "ashifadmin@gmail.com"

try:
    user = User.objects.get(email=email)
    print(f"Found user: {user.email}")

    if not user.is_staff:
        print("User is not staff. Setting is_staff=True...")
        user.is_staff = True
        user.save()
        print("Done. User is now staff.")
    else:
        print("User is already staff.")

    print(f"Stats -> Is Superuser: {user.is_superuser}, Is Staff: {user.is_staff}")

except User.DoesNotExist:
    print(f"User {email} not found.")
