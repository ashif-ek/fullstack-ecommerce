from django.test import TestCase
from rest_framework.test import APIClient
from products.models import Product, Category


class APIDiagnosticTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name="Sweet & Gourmand")
        self.product = Product.objects.create(
            name="Vanilla Dream",
            description="A sweet vanilla scent",
            price=50.00,
            stock=10,
            category=self.category,
        )

    def test_api_root(self):
        response = self.client.get("/api/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("endpoints", response.json())

    def test_category_filtering_by_name(self):
        # Test exact match
        response = self.client.get("/api/products/", {"category": "Sweet & Gourmand"})
        self.assertEqual(response.status_code, 200)
        results = response.json().get("results", [])
        self.assertTrue(len(results) > 0)
        self.assertEqual(results[0]["name"], "Vanilla Dream")

        # Test case-insensitive match
        response = self.client.get("/api/products/", {"category": "sweet & gourmand"})
        self.assertEqual(response.status_code, 200)
        results = response.json().get("results", [])
        self.assertTrue(len(results) > 0)
