from rest_framework import serializers
from .models import Order


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['receiver_name','phone_number','street_address','city','state','pincode','payment_mode']