from django.urls import path
from .views import AddProduct,UpdateProduct,GetProduct,ListProductsByCategoryPage,ListProductsBySearch,GetFilteredProducts,FilterProductsByMinPrice,ProductList,DeleteProduct,ListProductsByCategory,FilterProducts

urlpatterns = [
    path('productlist/',ProductList.as_view() , name='product-list'),
    path('AddProduct/',AddProduct.as_view() , name='add-product'),
    path('DeleteProduct/<int:product_id>',DeleteProduct.as_view() , name='delete-product'),
    path('UpdateProduct/<int:productId>',UpdateProduct.as_view() , name='update-product'),
    path('getById/<int:productId>/', GetProduct.as_view(), name='get-product'),
    path('<int:pageno>/', ListProductsByCategoryPage.as_view(), name='list-products'),
    path('search/<str:category>/', ListProductsByCategory.as_view(), name='list-products-by-category'),
    path('search/<str:category>/<str:searchString>/', ListProductsBySearch.as_view(), name='list-products-by-search'),
    path('<str:category>/getFilteredProducts/', GetFilteredProducts.as_view(), name='get-filtered-products-by-category'),
    path('filter-by-min-price/', FilterProductsByMinPrice.as_view(), name='filter-products-by-min-price'),
    path('<str:category>/filter-products/<int:min_price>/<int:max_price>/<str:publisher>/<str:sort_by>', FilterProducts.as_view(), name='filter-products'),
]
