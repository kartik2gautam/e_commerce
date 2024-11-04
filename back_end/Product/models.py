from django.db import models



def default_subcategory(): # creating default for subcategory which stores json field as an empty list
    return []


class Product(models.Model): # Product table created in the database
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    details = models.TextField()
    category = models.CharField(max_length=50)
    subcategory = models.JSONField( default=default_subcategory)
    Publisher = models.TextField()
    image_link = models.URLField()
