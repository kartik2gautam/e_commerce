from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart
from .serializers import CartSerializer,CartItemSerializer
from User.models import MyUser
from Product.models import Product

class GetCart(APIView): #api view to get the cart for a particular user
    def get(self, request, userId, format=None):
        try:
            cart_items = Cart.objects.filter(user_id=userId)# getting cart entries corresponding to logged user

            totalPrice=0       # instance to get the total price of cart 
            for item in cart_items:
                product=item.product
                totalPrice = totalPrice + (item.quantity*product.price)
            
            serializer = CartSerializer(cart_items, many=True)
            
            return Response({"data":serializer.data, "totalPrice":totalPrice}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)




class AddToCart(APIView): # Add to cart api with product id and quantity to add and userid
    def post(self, request, userId, productId,quantity, format=None):
        try:
            product = Product.objects.get(id = productId)
            cart_item, created = Cart.objects.get_or_create(user_id=userId, product_id=productId, product_name = product.name)
            if created:
                # If the cart item was created, set the initial quantity to the provided quantity
                cart_item.quantity = quantity
            else:
                # If the cart item already exists, add the provided quantity to the existing quantity
                cart_item.quantity += quantity
            cart_item.product_name = product.name
            cart_item.save()
            
            serializer = CartItemSerializer(cart_item)
            return Response({'msg':'Product added successfully!'}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)



class UpdateCart(APIView):   # Add to cart api with product id and final quantity of product and userid
    def post(self, request, userId, productId, quantity, format=None):
        try:
            if(quantity<=0): # deleting the particular product if it's quantity becomes 0 
                cart_item = Cart.objects.get(user_id=userId, product_id=productId)
                cart_item.delete()
            
            else:
                cart_item = Cart.objects.get(user_id=userId, product_id=productId)

            # Update the cart item's quantity
                cart_item.quantity = quantity
                cart_item.save()

                serializer = CartItemSerializer(cart_item)
                return Response({'msg': 'Cart item quantity updated successfully!'}, status=status.HTTP_200_OK)
            
        except Cart.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)



class RemoveFromCart(APIView): # api to remove the particular product from user cart
    def post(self, request, userId, productId, format=None):
        try:
            user = MyUser.objects.get(id=userId)
            product = Product.objects.get(id=productId)
            # Check if the specified product is in the user's cart
            cart_item = Cart.objects.get(user=user, product=product)

            # Remove the cart item
            cart_item.delete()

            return Response(f'{product.name} removed from cart', status=status.HTTP_200_OK)
        except MyUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Cart.DoesNotExist:
            return Response({'error': 'Product not found in the user\'s cart'}, status=status.HTTP_404_NOT_FOUND)







class EmptyCart(APIView): # api to empty the user cart 
    def post(self, request, userId, format=None):
        try:
            user = MyUser.objects.get(id=userId)
            # Remove all cart items for the user
            Cart.objects.filter(user=user).delete()

            return Response({'msg': 'Cart emptied successfully'}, status=status.HTTP_200_OK)
        except MyUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
