import razorpay
from django.conf import settings

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


def create_razorpay_order(order):
    if not order.total_amount:
        raise ValueError("Order total is missing")

    amount = int(float(order.total_amount) * 100)

    razorpay_order = client.order.create(
        {"amount": amount, "currency": "INR", "payment_capture": 1}
    )

    return razorpay_order
