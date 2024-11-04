from django.db import models
from User.models import MyUser
from datetime import timedelta

class Order(models.Model): # model for Order table in database
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    order_status = models.CharField(max_length=50, default="Processing")
    products = models.JSONField(default=list)
    receiver_name = models.CharField(max_length=200)
    phone_number = models.BigIntegerField()
    street_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.IntegerField()
    payment_mode = models.TextField()
    delivery_date = models.DateTimeField(null=True)
    amount = models.IntegerField(default=0)

    def add_product(self, product, quantity):
        product_data = {
            "product_id": product.id,
            "name": product.name,
            "price": float(product.price),
            "details": product.details,
            "category": product.category,
            "subcategory": product.subcategory,
            "quantity": quantity,
            "Publisher": product.Publisher,
            "product_image": product.image_link,
        }
        self.products.append(product_data)
        

    def remove_product(self, product_id):
        self.products = [p for p in self.products if p["product_id"] != product_id]


    def calculate_delivery_date(self):
        if self.order_date:
            delivery_date = self.order_date + timedelta(days=7)
            return delivery_date
        return None