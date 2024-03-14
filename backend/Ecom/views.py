from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics,status,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


class Product_List(APIView):
    # # permission_classes = [IsAuthenticated]
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
    
    def post(self,request):
        serializer = ProductPostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg':'product added'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        # Add logic for updating a music instance if needed
        pro_size = kwargs.get('pk')
        instance = get_object_or_404(Product_M, P_Size_ID=pro_size)
        serializer = ProductPostSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        pro_size = kwargs.get('pk')
        instance = get_object_or_404(Product_M, P_Size_ID=pro_size)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)   
    
class CategoriesList(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    
class Product_Color_MList(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Product_Color_M.objects.all()
    serializer_class = Product_Color_MSerializer
    
class Product_Size_MList(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Product_Size_M.objects.all()
    serializer_class = Product_Size_MSerializer
    
class Product_SizeList(APIView):
    def get(self, request, *args, **kwargs):
        product = self.request.query_params.get('product')
        pro_size=kwargs.get('pk')
        queryset = Product_Size.objects.all()

        if pro_size:
            queryset = Product_Size.objects.filter(P_Size_ID=pro_size)
            serializer = Product_SizeSerializer(queryset, many=True)
            return Response(serializer.data)
        
        if product:
            queryset = queryset.filter(Product_ID=product)

        serializer = Product_SizeSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = Product_SizePostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg':'product size and stocks added'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        # Add logic for updating a music instance if needed
        pro_size = kwargs.get('pk')
        instance = get_object_or_404(Product_Size, P_Size_ID=pro_size)
        serializer = Product_SizePostSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        pro_size = kwargs.get('pk')
        instance = get_object_or_404(Product_Size, P_Size_ID=pro_size)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)   
    
class Product_ImgList(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Product_Img.objects.all()
    serializer_class = Product_ImgSerializer
    
class Status_MList(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Status_M.objects.all()
    serializer_class = Status_MSerializer
    
class Offer_MList(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Offer_M.objects.all()
    serializer_class = Offer_MSerializer
    
class Payment_ModeList(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Payment_Mode.objects.all()
    serializer_class = Payment_ModeSerializer

import jwt
   
class Product_RateReview_MList(APIView):
    def get(self, request, *args, **kwargs):
        p_id = request.query_params.get('p_id')  # Get the p_id from query parameters
        queryset = Product_RateReview_M.objects.all()

        if p_id:
            queryset = queryset.filter(P_ID=p_id)  # Filter the queryset based on p_id

        serializer = Product_RateReview_MSerializer(queryset, many=True)
        return Response(serializer.data)
    
    # def get(self, request, *args, **kwargs):
    #     queryset = Product_RateReview_M.objects.all()
    #     serializer = Product_RateReview_MSerializer(queryset, many=True)
    #     return Response(serializer.data)
     
    def post(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "")

        try:
            decoded_token = jwt.decode(token, 'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m', algorithms=['HS256'])
            user_id = decoded_token.get("user_id", None)

            if user_id is not None:
                request.data['User_ID'] = user_id  # Assign user_id from JWT to User_ID field
                serializer = Product_RateReview_MPostSerializer(data=request.data)

                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({"error": "User ID not found in token"}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.exceptions.DecodeError:
            return Response({"error": "Malformed token"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)    
   


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