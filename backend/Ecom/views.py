from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.response import Response


class Product_List(APIView):
    def get(self, request, *args, **kwargs):
        product_id = kwargs.get('pk')
        category = self.request.query_params.get('category')

        if product_id is not None:
            product = Product_M.objects.get(pk=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)

        if category is not None:
            product = Product_M.objects.filter(Category__Categories_Name=category)
            serializer = ProductSerializer(product,many=True)
            return Response(serializer.data)
        
        products = Product_M.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    

# class CartDetailView(APIView):
#     def get_cart_for_user(self, user):
#     # Using get_or_create to retrieve the user's cart or create it if it doesn't exist
#         cart, created = Cart_M.objects.get_or_create(User_ID=user)
#         return cart
    
#     def get(self, request, *args, **kwargs):
#         # Fetch the cart and its items for the current user
#         cart = Cart_M.objects.get(user=self.request.user)
#         cart_items = Cart_Details.objects.filter(cart=cart)
#         serialized_cart_items = CartItemSerializer(cart_items, many=True).data

#         # Include size information for each product in the cart
#         for cart_item_data in serialized_cart_items:
#             product_id = cart_item_data['Product_ID']
#             cart_item_data['Size'] = Product_Size_M.objects.get(Product_ID=product_id).Size_Name

#         return Response({'cart_items': serialized_cart_items, 'total_price': cart.total_price})

#     def post(self, request, *args, **kwargs):
#         # Add a new item to the cart
#         serializer = CartItemSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         current_user = self.request.user 

#         cart = self.get_cart_for_user(current_user)

#         product = serializer.validated_data['Product_ID']
#         quantity = serializer.validated_data['ItemQuantity']
#         size = serializer.validated_data.get('Size')  # Optional size selection
#         subtotal = product.P_Price * quantity

#         cart_item = Cart_Details.objects.create(cart=cart, product=product, quantity=quantity, size=size, subtotal=subtotal)

#         # Update total price in the cart
#         cart.total_price += subtotal
#         cart.save()

#         response_data = {
#             'message': 'Item added to the cart successfully',
#             'cart_item': CartItemSerializer(cart_item).data,
#         }

#         return Response(response_data, status=status.HTTP_201_CREATED)

#     def put(self, request, *args, **kwargs):
#         # Update quantity or other details of a cart item
#         cart_item = Cart_Details.objects.get(pk=request.data.get('cart_item_id'))
#         serializer = CartItemSerializer(cart_item, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         # Update total price in the cart
#         cart = cart_item.Cart_ID
#         cart.total_price += cart_item.SubTotal - serializer.initial_data['SubTotal']
#         cart.save()

#         return Response({'message': 'Cart item updated successfully'})

#     def delete(self, request, *args, **kwargs):
#         # Delete a cart item
#         cart_item = Cart_Details.objects.get(pk=request.data.get('cart_item_id'))

#         # Update total price in the cart before deleting the cart item
#         cart = cart_item.Cart_ID
#         cart.total_price -= cart_item.SubTotal
#         cart.save()

#         cart_item.delete()

#         return Response({'message': 'Cart item deleted successfully'})