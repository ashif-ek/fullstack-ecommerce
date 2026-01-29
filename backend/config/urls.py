from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import CustomTokenObtainPairView, TestProtected, LogoutAPIView

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT auth
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', LogoutAPIView.as_view(), name='logout'),

    # Accounts app
    path('api/auth/', include('accounts.urls')),
    
    path('api/test/', TestProtected.as_view()),
]