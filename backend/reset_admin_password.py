import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User

email = "ashifadmin@gmail.com"
new_pass = "admin12345"

try:
    user = User.objects.get(email=email)
    user.set_password(new_pass)
    user.save()
    print(f"Password for {email} has been reset to: {new_pass}")
    print(f"Stats -> Is Staff: {user.is_staff}, Is Superuser: {user.is_superuser}")

except User.DoesNotExist:
    print(f"User {email} not found.")
