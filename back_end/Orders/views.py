from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from User.models import MyUser
from .models import  Order
from Cart.models import Cart
from Product.models import Product
from .serializers import CreateOrderSerializer
from django.utils import timezone

class CreateOrder(APIView): # creating the order api 
    def post(self, request, userId, format=None):
        try:
            user = MyUser.objects.get(id=userId) # getting the logged in user
            cart_items = Cart.objects.filter(user_id=userId) # getting user's cart
            if not cart_items:
                return Response({'error': 'Cart is empty, cannot create an order'}, status=status.HTTP_400_BAD_REQUEST)
            order = Order.objects.create( # creating order: requiring these fields to place order
                user=user,
                order_date=timezone.now(), 
                order_status="Processing",
                receiver_name=request.data.get('receiver_name'),
                phone_number=request.data.get('phone_number'),
                street_address=request.data.get('street_address'),
                city=request.data.get('city'),
                state=request.data.get('state'),
                pincode=request.data.get('pincode'),
                payment_mode=request.data.get('payment_mode'),
            )
            for cart_item in cart_items: # calculating the total amount of the order to be added in the order table 
                order.amount += cart_item.quantity* cart_item.product.price
                order.add_product(cart_item.product, quantity=cart_item.quantity)

            cart_items.delete() # deleting the cart items after placing the order 
            order.delivery_date = order.calculate_delivery_date() # ideal delivery date to add in the Order table 
            order.save() # saving the order in the table 
            response_data = {   # getting these details after the order is placed after calculating them in the view
                'orderId': order.id,
                'products': order.products,  
                'orderStatus': order.order_status,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        except MyUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



class GetOrderHistory(APIView): # api for getting the user's previous order details and also to show order status 
    def get(self, request, userId, format=None):
        try:
            user = MyUser.objects.get(id=userId)
            orders = Order.objects.filter(user=user)
            order_history = []
            for order in orders:
                order_data = { # getting each order detail in this form to publish on the Order history page 
                    'orderId': order.id,
                    'products': order.products,
                    'orderStatus': order.order_status,
                    'order_date': order.order_date,
                    'receiver name': order.receiver_name,
                    'receiver phone no': order.phone_number,
                    'shipping address': order.street_address,
                    'shipping city': order.city,
                    'shipping state': order.state,
                    'payment_mode': order.payment_mode,
                    'delivered by': order.delivery_date,
                    'Total Amount': order.amount,
                }
                order_history.append(order_data) # updating the final order_history to be received after the api call

            return Response(order_history, status=status.HTTP_200_OK)
        except MyUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
