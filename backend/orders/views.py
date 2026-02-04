from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError

from django.shortcuts import get_object_or_404
from .models import Order
from .services import create_order_from_cart


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        shipping_address = request.data.get("shipping_address")

        if not shipping_address:
            return Response(
                {"detail": "Shipping address is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            order = create_order_from_cart(request.user)

            # update shipping AFTER creation
            order.shipping_address = shipping_address
            order.save(update_fields=["shipping_address"])

            return Response({"id": order.id}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class OrderCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk, user=request.user)

        try:
            order.status = Order.STATUS_CANCELLED
            order.save()
            return Response(
                {"detail": "Order cancelled successfully"}, status=status.HTTP_200_OK
            )
        except ValidationError as e:
            return Response(
                {"detail": e.message if hasattr(e, "message") else str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
