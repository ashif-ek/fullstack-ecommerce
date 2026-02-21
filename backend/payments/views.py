from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.conf import settings

from orders.models import Order
from cart.models import CartItem
from .services import create_razorpay_order


class RazorpayPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)

        if order.status != Order.STATUS_CREATED:
            return Response({"detail": "Order not eligible for payment"}, status=400)

        razorpay_order = create_razorpay_order(order)

        # Mark order as payment initiated
        order.status = Order.STATUS_PAYMENT_INITIATED
        order.save()

        return Response(
            {
                "razorpay_order_id": razorpay_order["id"],
                "amount": razorpay_order["amount"],
                "currency": "USD",
                "key": settings.RAZORPAY_KEY_ID,
            }
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    """
    Called after Razorpay success.
    Verifies the cryptographic HMAC signature from Razorpay.
    """
    try:
        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_signature = request.data.get("razorpay_signature")
        order_id = request.data.get("order_id")

        if not all(
            [razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id]
        ):
            return Response({"error": "Missing payment credentials"}, status=400)

        # 1️ VERIFY SIGNATURE (Prevent replay attacks and authenticity verification)
        params_dict = {
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature,
        }

        from .services import client as razorpay_client

        try:
            razorpay_client.utility.verify_payment_signature(params_dict)
        except Exception:
            return Response({"error": "Invalid signature verification"}, status=400)

        # 2️ Find Order & Check Idempotency
        order = get_object_or_404(Order, id=order_id, user=request.user)

        if order.status == Order.STATUS_PAID:
            return Response(
                {"status": "already_paid", "message": "Order already processed"}
            )

        # 3️ Mark order paid
        order.status = Order.STATUS_PAID
        order.save()

        # 4️ CLEAR CART (BACKEND-DRIVEN)
        CartItem.objects.filter(cart__user=request.user).delete()

        return Response({"status": "success"})
    except Exception:
        import traceback

        traceback.print_exc()
        return Response({"error": "Payment verification failed"}, status=500)
