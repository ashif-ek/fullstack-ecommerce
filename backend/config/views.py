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
