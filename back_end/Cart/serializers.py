from rest_framework import serializers
from .models import Cart


#Created different serializers for different api requirements 
class CartSerializer(serializers.ModelSerializer): 
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'quantity', 'product_name']

    def get_product_name(self, obj):
        return obj.product.name




class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = [ 'product_id','user_id', 'quantity','product_name']
