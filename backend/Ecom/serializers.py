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
    size = Product_Size_MSerializer(read_only=True)   
    class Meta:
        model = Product_Size
        fields = '__all__'

class Product_SizePostSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Product_Size
        fields = '__all__'

class Product_Color_MSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Color_M
        fields = '__all__'

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

class ProductPostSerializer(serializers.ModelSerializer):

    class Meta:
        model=Product_M
        fields='__all__'


class Status_MSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status_M
        fields = '__all__'

class Offer_MSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer_M
        fields = '__all__'

class Payment_ModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_Mode
        fields = '__all__'

# class CartItemSerializer(serializers.ModelSerializer):
#     Size = Product_Size_MSerializer()

#     class Meta:
#         model = Cart_Details
#         fields = ['Product_ID','ItemQuantity','SubTotal', 'Size']

# class CartSerializer(serializers.ModelSerializer):
#     Cart_Items = CartItemSerializer(many=True, read_only=True)

#     class Meta:
#         model = Cart_M
#         fields = ['User_ID','total_price', 'Cart_Items']
