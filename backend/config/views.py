from django.http import JsonResponse
from django.db import connection
from django.utils import timezone


def health_check(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        return JsonResponse(
            {
                "status": "ok",
                "database": "connected",
                "timestamp": timezone.now().isoformat(),
            }
        )
    except Exception as e:
        return JsonResponse(
            {"status": "error", "database": "disconnected", "error": str(e)}, status=503
        )


def api_root(request):
    return JsonResponse(
        {
            "message": "Welcome to the E-Commerce API",
            "endpoints": {
                "health": "/api/health/",
                "products": "/api/products/",
                "cart": "/api/cart/",
                "orders": "/api/orders/",
                "payments": "/api/payments/",
                "auth": "/api/auth/",
                "admin": "/api/admin/",
                "schema": "/api/schema/",
            },
        }
    )
