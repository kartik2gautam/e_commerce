from rest_framework import serializers
from .models import Product

# creating custom serializers according to various api view needs by extending serializers's moderlserializer
class AddProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'details', 'category', 'subcategory','Publisher','image_link']



class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'details', 'category', 'subcategory','Publisher','image_link']



class GetProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields =  ['name', 'price', 'details', 'category', 'subcategory','Publisher','image_link']



class ListProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields =  "__all__"




class FilterProductSerializer(serializers.Serializer):
    filterName = serializers.CharField()
    filterValue = serializers.CharField()




class FilterProductsByMinPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields =  ['name', 'price', 'details', 'category', 'subcategory','Publisher','image_link']



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields =  ['name', 'price', 'details', 'category', 'subcategory','Publisher','image_link']


