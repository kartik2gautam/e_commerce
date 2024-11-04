from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product
from .serializers import AddProductSerializer,UpdateProductSerializer,GetProductSerializer,ListProductSerializer,FilterProductSerializer,FilterProductsByMinPriceSerializer,ProductSerializer
from django.core.paginator import Paginator




class ProductList(APIView): # view to get all products available in database
    def get(self, request, format = None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many  =True)
        if(serializer.is_valid): # kind of error exception 
            response_data = []
            for product in serializer.data:
                product_data = {
                    "name": product['name'],
                    "price": product['price'],
                    "details": product['details'],
                    "category": product['category'],
                    "subcategory": product['subcategory'],
                    "Publisher": product['Publisher'],
                    "image_link": product['image_link'],
                }
                response_data.append(product_data) # creating an response_data instance by adding all the products details in form of the serializer

            return Response(response_data, status=status.HTTP_200_OK) #returning the response of the response_data of all produts 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        


class AddProduct(APIView): # api for adding a product by admin 
    def post(self, request, format=None):
        serializer = AddProductSerializer(data=request.data) #product details in serializer form 
        if serializer.is_valid():
            product = serializer.save()
            response_data = {   # if want the send the added produt back 
                "name": product.name,
                "price": product.price,
                "details": product.details,
                "category": product.category,
                "subcategory": product.subcategory,
                "Publisher": product.Publisher,
                "image_link": product.image_link,
            }
            return Response({'msg': 'Product added successfully!'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UpdateProduct(APIView): # Updating a particular product details using it's id 
    def put(self, request,productId, format=None):
        try:  # checking whether the product exists or not 
            product = Product.objects.get(id=productId)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save() # saving the final details 
            return Response({'msg': 'Product updated successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



class DeleteProduct(APIView): # deleting an product by using it's id 
    def delete(self, request, product_id, format=None):
        try:    # whether product exists or not 
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        product.delete() # deleting product from database
        return Response({'msg': 'Product deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)




class GetProduct(APIView): # api to get all details of a product for single product view or to show the details of product at any time
    def get(self, request, productId, format=None):
        try:  # if product exists or not 
            product = Product.objects.get(id=productId)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GetProductSerializer(product)
        response_data = { # saving the product details in response_data
            "name": product.name,
            "price": product.price,
            "details": product.details,
            "category": product.category,
            "subcategory": product.subcategory,
            "Publisher": product.Publisher,
            "image_link": product.image_link,
        }

        return Response(response_data, status=status.HTTP_200_OK)





class ListProductsByCategoryPage(APIView): #api to send the products by page number
    page_size = 7  # Set the number of items per page as needed
    
    def get(self, request,pageno, format=None):
        products = Product.objects.all() # all products 
        products_count = products.count() # total number of products in database
        paginator = Paginator(products, 7) # number of products in a page 
        if(products_count%7==0): # calculating numbe of pages to send 
           no_of_pages = products_count/7 
        else:
            no_of_pages = (products_count//7)+1   
        page = pageno
        productsfinal = paginator.get_page(page)
        serializer = ListProductSerializer(productsfinal, many=True)
        
        return Response({ # returning the response with products data , current page called, and total number of pages there will be 
                "data": serializer.data,
                "current_page": page,
                "total_pages": no_of_pages,
                
            })



class ListProductsByCategory(APIView): # getting products with particular category
    
    def get(self, request, category, format=None):
        products = Product.objects.filter(category=category)
        serializer = ListProductSerializer(products, many=True)
        
        return Response({
                "data": serializer.data,  
            })



class ListProductsBySearch(APIView): # getting product with particular staring string 
    def get(self, request,category, searchString, format=None):
        products = Product.objects.filter(category=category).filter(name__istartswith=searchString)
        # products = products.filter(name__istartswith=searchString)  # Case-insensitive search
        serializer = ListProductSerializer(products, many=True)
        

        response_data = []
        for product in serializer.data:
            product_data = {
                "name": product['name'],
                "price": product['price'],
                "details": product['details'],
                "category": product['category'],
                "subcategory": product['subcategory'],
                "Publisher": product['Publisher'],
                "image_link": product['image_link'],
            }
            response_data.append(product_data)
            print(response_data)

        return Response({'data':response_data})





class FilterProducts(APIView):
    def get(self, request,min_price, max_price, publisher,sort_by, category, format=None):
        # Extract additional query parameters
        
        print(publisher)
        print(request.data)

        # Initial queryset with basic filters
            
        products = Product.objects.filter( category=category)

        # Apply additional filters based on query parameters
        if min_price:
            products = products.filter(price__gte=min_price)
        if max_price:
            products = products.filter(price__lte=max_price)
        if (publisher=='All'):
            products = products
        else:
            products = products.filter(Publisher=publisher)    

        # Apply sorting
        if sort_by == 'PriceHighToLow':
            products = products.order_by('-price')
        elif sort_by == 'PriceLowToHigh':
            products = products.order_by('price')

        serializer = ListProductSerializer(products, many=True)

        response_data = []
        for product in serializer.data:
            product_data = {
                "id": product['id'],
                "name": product['name'],
                "price": product['price'],
                "details": product['details'],
                "category": product['category'],
                "subcategory": product['subcategory'],
                "Publisher": product['Publisher'],
                "image_link": product['image_link'],
            }
            response_data.append(product_data)

        return Response({
            'data':response_data
        })





class GetFilteredProducts(APIView):
    def post(self, request, category, format=None):
        filter_serializer = FilterProductSerializer(data=request.data)
        if filter_serializer.is_valid():
            filter_name = filter_serializer.validated_data.get('filterName')
            filter_value = filter_serializer.validated_data.get('filterValue')
            products = Product.objects.filter(category=category, **{filter_name: filter_value})
            serializer = ListProductSerializer(products, many=True)

            response_data = []
            for product in serializer.data:
                product_data = {
                    "name": product['name'],
                    "price": product['price'],
                    "details": product['details'],
                    "category": product['category'],
                    "subcategory": product['subcategory'],
                    "Publisher": product['Publisher'],
                    "image_link": product['image_link'],
                }
                response_data.append(product_data)

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(filter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class FilterProductsByMinPrice(APIView):
    def get(self, request, format=None):
        try:
           
            min_price = float(request.query_params.get('min_price', 0))
            print(f"min_price: {min_price}")
            products = Product.objects.filter(price__gte=min_price)
            print(f"Number of products: {products.count()}")
            serializer = FilterProductsByMinPriceSerializer(products, many=True)
            return Response({'msg':'Correct!'}, status=status.HTTP_200_OK)
        except ValueError:
            return Response({'error': 'Invalid minimum price value'}, status=status.HTTP_400_BAD_REQUEST)
