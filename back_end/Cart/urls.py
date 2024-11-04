from django.urls import path
from .views import GetCart,AddToCart,RemoveFromCart,EmptyCart,UpdateCart


urlpatterns = [
     path('getCart/<int:userId>/', GetCart.as_view(), name='get-cart'),
     path('<int:userId>/add/<int:productId>/<int:quantity>', AddToCart.as_view(), name='add-to-cart'),
     path('<int:userId>/remove/<int:productId>/', RemoveFromCart.as_view(), name='remove-from-cart'),
     path('<int:userId>/empty/', EmptyCart.as_view(), name='empty-cart'),
     path('<int:userId>/update/<int:productId>/<int:quantity>', UpdateCart.as_view(), name='update-cart'),
]






