import razorpay
from django.conf import settings

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


def create_razorpay_order(order):
    razorpay_order = client.order.create({
        "amount": int(order.total_amount * 100),  # INR → paise
        "currency": "INR",
        "payment_capture": 1
    })
    return razorpay_order
