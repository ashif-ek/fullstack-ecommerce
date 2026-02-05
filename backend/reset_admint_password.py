import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User

email = "admint@gmail.com"
new_pass = "1234567890"

try:
    user = User.objects.get(email=email)
    user.set_password(new_pass)
    user.is_staff = True
    user.is_active = True
    user.save()
    print(f"Password for {email} has been reset to: {new_pass}")
    print(
        f"Stats -> Is Staff: {user.is_staff}, Is Active: {user.is_active}, Username: {user.username}"
    )

except User.DoesNotExist:
    print(f"User {email} not found.")
