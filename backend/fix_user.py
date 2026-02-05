import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User

email = "ashifadmin@gmail.com"
try:
    user = User.objects.get(email=email)
    print(f"Found user: {user.username}")

    # Fix permissions
    user.is_staff = True
    user.is_superuser = True

    # Reset password
    user.set_password("1234567890")
    user.save()

    print(
        "SUCCESS: Password set to '1234567890' and is_staff/is_superuser set to True."
    )
except User.DoesNotExist:
    print("User not found.")
