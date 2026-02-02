from django.urls import path
from .views import RazorpayPaymentView, verify_payment

urlpatterns = [
    path("razorpay/<int:order_id>/", RazorpayPaymentView.as_view()),
    path("verify/", verify_payment),
]
