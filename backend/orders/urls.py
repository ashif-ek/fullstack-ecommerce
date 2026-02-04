from django.urls import path
from .views import OrderCreateView, OrderCancelView

urlpatterns = [
    path("", OrderCreateView.as_view(), name="order-create"),
    path("<int:pk>/cancel/", OrderCancelView.as_view(), name="order-cancel"),
]
