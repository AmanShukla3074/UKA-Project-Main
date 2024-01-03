from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   # Products
   path('products/', Product_List.as_view(), name='product-list'),
   path('products/<int:pk>/', Product_List.as_view(), name='product-detail'),
]
if settings.DEBUG:
    urlpatterns += static(settings.PRODUCT_MEDIA_URL, document_root=settings.PRODUCT_MEDIA_ROOT)
    urlpatterns += static(settings.PROFILE_MEDIA_URL, document_root=settings.PROFILE_MEDIA_ROOT)