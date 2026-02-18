from django.urls import path
from .views import ContactMessageCreateView, NewsletterSubscriberCreateView

urlpatterns = [
    path("contact/", ContactMessageCreateView.as_view(), name="contact-create"),
    path(
        "newsletter/",
        NewsletterSubscriberCreateView.as_view(),
        name="newsletter-create",
    ),
]
