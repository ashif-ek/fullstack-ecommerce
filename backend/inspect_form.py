import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.forms import CustomUserCreationForm

form = CustomUserCreationForm()
print("Base fields:", form.fields.keys())
print("Declared fields:", form.base_fields.keys())
