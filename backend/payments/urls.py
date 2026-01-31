from django.urls import path
from .views import RazorpayPaymentView

urlpatterns = [
    path("razorpay/<int:order_id>/", RazorpayPaymentView.as_view()),
]
