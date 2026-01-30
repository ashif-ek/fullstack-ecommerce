from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Order
from .serializers import OrderSerializer
from .services import create_order_from_cart

class OrderCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order = create_order_from_cart(request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
class OrderDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        order = get_object_or_404(Order, pk=pk, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
class OrderCancelView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk, user=request.user)

        if order.status != Order.STATUS_CREATED:
            return Response(
                {"detail": "Order cannot be cancelled"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = Order.STATUS_CANCELLED
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data)
