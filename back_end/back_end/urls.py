
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/',include('User.urls')),
    path('api/product/',include('Product.urls')),
    path('api/cart/',include('Cart.urls')),
    path('api/order/',include('Orders.urls')),
]
