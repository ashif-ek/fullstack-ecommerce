from django.urls import path
from .views import CartView, AddToCartView, UpdateCartItemView

urlpatterns = [
    path("", CartView.as_view()),
    path("add/", AddToCartView.as_view()),
    path("update/", UpdateCartItemView.as_view()),
    
]
