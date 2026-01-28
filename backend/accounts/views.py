# from django.contrib.auth.models import User
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json

# @csrf_exempt
# def register(request):
#     if request.method == "POST":
#         data = json.loads(request.body)

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not password:
#             return JsonResponse({"error": "Username and password required"}, status=400)

#         if User.objects.filter(username=username).exists():
#             return JsonResponse({"error": "User already exists"}, status=400)

#         User.objects.create_user(
#             username=username,
#             email=email,
#             password=password
#         )

#         return JsonResponse({"message": "User registered successfully"}, status=201)


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully",
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "name": user.first_name or user.email.split("@")[0],
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)