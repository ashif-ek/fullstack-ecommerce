import os
import django
import sys

sys.path.append("d:/fullstack-ecommerce/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from products.models import Product


def check_product_image():
    try:
        # Based on previous verification, product_id was 1 represents 'axe' (wait, previous output said 'axe', screenshot says 'Dior Sauvage'?
        # Actually user might have different data. Let's check first few products.
        products = Product.objects.all()[:5]
        for p in products:
            print(f"Product: {p.id} - {p.name}")
            print(f"  Image Field: {p.image}")
            if p.image:
                print(f"  Image URL: {p.image.url}")
            else:
                print(f"  No Image set")
            print("-" * 20)

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    check_product_image()
