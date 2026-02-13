import os
import sys
import django
from django.conf import settings
from django.urls import get_resolver

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
sys.path.append(os.getcwd())
django.setup()


def list_urls(lis, acc=None):
    if acc is None:
        acc = []
    if not lis:
        return
    for entry in lis:
        if hasattr(entry, "url_patterns"):
            list_urls(entry.url_patterns, acc + [str(entry.pattern)])
        else:
            print("".join(acc) + str(entry.pattern))


if __name__ == "__main__":
    print("Printing all URL patterns:")
    try:
        list_urls(get_resolver().url_patterns)
    except Exception as e:
        print(f"Error listing URLs: {e}")
