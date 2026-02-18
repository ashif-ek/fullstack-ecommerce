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
    Called after Razorpay success
    """

    try:
        # 1️ Mark order paid
        order = get_object_or_404(Order, id=request.data["order_id"], user=request.user)
        order.status = Order.STATUS_PAID
        order.save()

        # 2️ CLEAR CART (BACKEND-DRIVEN, CSRF-SAFE)
        CartItem.objects.filter(cart__user=request.user).delete()

        return Response({"status": "success"})
    except Exception as e:
        import traceback

        traceback.print_exc()
        return Response({"error": str(e)}, status=500)
