from django.urls import path
from .views import CreateOrder,GetOrderHistory

# urlpatterns to call the api corresponding to each view
urlpatterns = [
    path('<int:userId>/createOrder/', CreateOrder.as_view(), name='create-order'),
    path('<int:userId>/getOrders/', GetOrderHistory.as_view(), name='get-orders'),
]
