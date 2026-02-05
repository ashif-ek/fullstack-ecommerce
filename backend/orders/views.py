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


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_staff or request.user.is_superuser:
            orders = Order.objects.all().order_by("-created_at")
        else:
            orders = Order.objects.filter(user=request.user).order_by("-created_at")

        from .serializers import OrderSerializer

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        """Allow admins to update order status."""
        if not (request.user.is_staff or request.user.is_superuser):
            return Response(
                {"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN
            )

        order = get_object_or_404(Order, pk=pk)

        # Only allow updating specific fields for now (like status)
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
