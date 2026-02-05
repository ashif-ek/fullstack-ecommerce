import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User

email = "adminx@gmail.com"
password = "1234567890"

try:
    user = User.objects.get(email=email)
    print(f"User {email} exists.")
except User.DoesNotExist:
    print(f"User {email} does not exist. Creating...")
    user = User.objects.create_user(email=email, password=password, username="adminx")

# Update attributes
user.set_password(password)
user.is_staff = True
user.is_active = True
user.save()

print(f"User {email} updated.")
print(f"Password: {password}")
print(f"Is Staff: {user.is_staff}")
print(f"Is Active: {user.is_active}")
