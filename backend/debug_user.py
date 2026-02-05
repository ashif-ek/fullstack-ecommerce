import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User

email = "ashifadmin@gmail.com"
print(f"--- Debugging User: {email} ---")

try:
    # Try finding by email
    user_by_email = User.objects.get(email=email)
    print(f"FOUND BY EMAIL:")
    print(f"  ID: {user_by_email.id}")
    print(f"  Username: '{user_by_email.username}'")
    print(f"  Email: '{user_by_email.email}'")
    print(f"  Is Staff: {user_by_email.is_staff}")
    print(f"  Is Superuser: {user_by_email.is_superuser}")
    print(
        f"  Check Password '1234567890': {user_by_email.check_password('1234567890')}"
    )
except User.DoesNotExist:
    print("NOT FOUND BY EMAIL")

print("-" * 20)

try:
    # Try finding by username (in case they put email in username field)
    user_by_username = User.objects.get(username=email)
    print(f"FOUND BY USERNAME:")
    print(f"  ID: {user_by_username.id}")
    print(f"  Username: '{user_by_username.username}'")
    print(f"  Email: '{user_by_username.email}'")
    print(f"  Is Staff: {user_by_username.is_staff}")
    print(f"  Is Superuser: {user_by_username.is_superuser}")
    print(
        f"  Check Password '1234567890': {user_by_username.check_password('1234567890')}"
    )
except User.DoesNotExist:
    print("NOT FOUND BY USERNAME")
