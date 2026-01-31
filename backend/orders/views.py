from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError

from .services import create_order_from_cart


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        shipping_address = request.data.get("shipping_address")

        if not shipping_address:
            return Response(
                {"detail": "Shipping address is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            order = create_order_from_cart(request.user)

            # update shipping AFTER creation
            order.shipping_address = shipping_address
            order.save(update_fields=["shipping_address"])

            return Response(
                {"id": order.id},
                status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
