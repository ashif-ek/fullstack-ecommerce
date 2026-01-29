from django.urls import path
from .views import RegisterAPIView, CustomTokenObtainPairView, CustomTokenRefreshView, TestProtected, LogoutAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('test/', TestProtected.as_view(), name='test_protected'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]