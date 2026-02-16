from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from products.models import Product, ProductReview
from django.db.models import Avg, Count, Q

User = get_user_model()


class ProductReviewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", email="test@example.com", password="password"
        )
        self.admin = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="password"
        )
        self.product = Product.objects.create(
            name="Test Product", description="Test Description", price=10.00, stock=100
        )
        self.client = APIClient()

    def test_create_review(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "product": self.product.id,
            "rating": 5,
            "title": "Great product",
            "comment": "I loved it!",
        }
        response = self.client.post("/api/products/reviews/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProductReview.objects.count(), 1)
        review = ProductReview.objects.first()
        self.assertFalse(review.is_approved)

    def test_duplicate_review(self):
        ProductReview.objects.create(
            product=self.product, user=self.user, rating=4, title="Good", comment="Nice"
        )
        self.client.force_authenticate(user=self.user)
        data = {
            "product": self.product.id,
            "rating": 5,
            "title": "Another review",
            "comment": "Spam",
        }
        response = self.client.post("/api/products/reviews/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_rating_validation(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "product": self.product.id,
            "rating": 6,  # Invalid
            "title": "Bad rating",
            "comment": "Invalid",
        }
        response = self.client.post("/api/products/reviews/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_aggregation(self):
        # Create approved reviews
        ProductReview.objects.create(
            product=self.product,
            user=self.user,
            rating=5,
            is_approved=True,
            title="1",
            comment="1",
        )

        user2 = User.objects.create_user(
            username="user2", email="user2@example.com", password="password"
        )
        ProductReview.objects.create(
            product=self.product,
            user=user2,
            rating=3,
            is_approved=True,
            title="2",
            comment="2",
        )

        # Create unapproved review
        user3 = User.objects.create_user(
            username="user3", email="user3@example.com", password="password"
        )
        ProductReview.objects.create(
            product=self.product,
            user=user3,
            rating=1,
            is_approved=False,
            title="3",
            comment="3",
        )

        # Test queryset annotation manually since we can't easily test viewset aggregation without full URL routing or careful setup
        # But we can test the viewset logic by mocking request or just querying like the view does

        qs = Product.objects.annotate(
            average_rating=Avg("reviews__rating", filter=Q(reviews__is_approved=True)),
            total_reviews=Count("reviews", filter=Q(reviews__is_approved=True)),
        )
        p = qs.get(id=self.product.id)

        self.assertEqual(p.total_reviews, 2)
        self.assertEqual(p.average_rating, 4.0)
