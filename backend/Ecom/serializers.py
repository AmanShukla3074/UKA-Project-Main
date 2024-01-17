from rest_framework import serializers
from .models import *

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Categories
        fields="__all__"

class Product_ImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Img
        fields = '__all__'

class Product_Size_MSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Size_M
        fields = '__all__'

class Product_SizeSerializer(serializers.ModelSerializer):
    size = Product_Size_MSerializer()   
    class Meta:
        model = Product_Size
        fields = '__all__'


class Product_Color_MSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Color_M
        fields = '__all__'

# class Product_ColorSerializer(serializers.ModelSerializer):
#     color = Product_Color_MSerializer()
#     sizes = serializers.SerializerMethodField()
#     images = serializers.SerializerMethodField()

#     def get_images(self,obj):
#         product_img = Product_Img.objects.filter(product_color=obj)
#         serializer = Product_ImgSerializer(product_img, many=True)
#         return serializer.data 

#     def get_sizes(self,obj):
#         product_size = Product_Size.objects.filter(product_color=obj)
#         serializer = Product_SizeSerializer(product_size, many=True)
#         return serializer.data    
#     class Meta:
#         model=Product_Color
#         fields=["color",'sizes','images']



class ProductSerializer(serializers.ModelSerializer):
    Category = CategoriesSerializer()
    Color = Product_Color_MSerializer()
    Size = serializers.SerializerMethodField()
    Images = serializers.SerializerMethodField()

    def get_Images(self,obj):
        product_img = Product_Img.objects.filter(Product_ID=obj)
        serializer = Product_ImgSerializer(product_img, many=True)
        return serializer.data 

    def get_Size(self,obj):
        product_size = Product_Size.objects.filter(Product_ID=obj)
        serializer = Product_SizeSerializer(product_size, many=True)
        return serializer.data      
      
    class Meta:
        model=Product_M
        fields=['P_ID','P_Name','P_Desc','P_Price','Category','Color','Size','Images']