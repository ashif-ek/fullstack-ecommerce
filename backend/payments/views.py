from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from orders.models import Order
from .services import create_razorpay_order
from django.conf import settings


class RazorpayPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)

        if order.status != Order.STATUS_CREATED:
            return Response(
                {"detail": "Order not eligible for payment"},
                status=400
            )

        razorpay_order = create_razorpay_order(order)

        return Response({
            "razorpay_order_id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": "INR",
            "key": settings.RAZORPAY_KEY_ID
        })
