from django.db import models
from User.models import MyUser 
from Product.models import Product  

class Cart(models.Model): # Cart table for database to store entry for each product type 
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)  
    product_name = models.CharField(max_length=100,default=None)

    def __str__(self):
        return f"Cart - {self.id}"
