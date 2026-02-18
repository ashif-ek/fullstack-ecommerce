from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import UserDetailView
from django.conf import settings
from .views import health_check
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


urlpatterns = [
    path("api/health/", health_check),
    path("admin/", admin.site.urls),
    path("api/admin/", include("accounts.admin_urls")),
    path("api/auth/", include("accounts.urls")),
    path("api/cart/", include("cart.urls")),
    path("api/orders/", include("orders.urls")),
    path("api/payments/", include("payments.urls")),
    path("api/products/", include("products.urls")),
    path("api/communication/", include("communication.urls")),
    path("api/users/<int:pk>/", UserDetailView.as_view()),
    # Swagger UI
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all route for React SPA
urlpatterns += [
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
