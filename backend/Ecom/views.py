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
    

from django.db.models import Q
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .models import Product_M, Categories, Product_Color_M, Product_Size, Product_Img
# from .serializers import ProductSerializer, CategoriesSerializer, Product_Color_MSerializer, Product_SizeSerializer, Product_ImgSerializer

# class ProductSearchView(APIView):
#     # permission_classes = [IsAuthenticated] # Uncomment if you want to restrict access

#     def get(self, request, *args, **kwargs):
#         query = request.query_params.get('query', '')

#         # Search products
#         product_results = Product_M.objects.filter(
#             Q(P_Name__icontains=query) | 
#             Q(P_Desc__icontains=query) | 
#             Q(Category__name__icontains=query) # Assuming Categories model has a 'name' field
#         )
#         product_serializer = ProductSerializer(product_results, many=True).data

#         return Response({
#             'products': product_serializer,
#         })


class ProductSearchView(APIView):
  def get(self, request, *args, **kwargs):
    query = request.query_params.get('query', '')
    print(f"Query: {query}") # Debugging line

    product_results = Product_M.objects.filter(
        Q(P_Name__icontains=query) | 
        Q(P_Desc__icontains=query)
    )
    print(f"Product Results: {product_results}") # Debugging line

    product_serializer = ProductSerializer(product_results, many=True).data
    return Response({
        'products': product_serializer,
    })

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
   

class CartDetailView(APIView):
    def get_cart_for_user(self, user):
        cart, created = Cart_M.objects.get_or_create(User_ID=user)
        return cart
    
    # def get(self, request, *args, **kwargs):

    #     current_user = self.request.user

    #     cart = self.get_cart_for_user(current_user)
    #     serialized_cart = Cart_MSerializer(cart).data
    #     cart_items = Cart_Details.objects.filter(Cart_ID=cart)
    #     cart_items_serializer = Cart_DetailsSerializer(cart_items, many=True).data

        
    #     item_ids = cart_items.values_list('P_ID', flat=True)
    #     menu_items = Product_M.objects.filter(P_ID__in=item_ids)
    #     menu_serializer = ProductSerializer(menu_items, many=True).data

    #     response_data = {
    #             'cart': serialized_cart,
    #             'cart_items': cart_items_serializer,
    #             'menus': menu_serializer,
    #             'message': 'Cart retrieved successfully'
    #         }

    #     return Response(response_data)

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "")

        try:
            decoded_token = jwt.decode(token, 'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m', algorithms=['HS256'])
            user_id = decoded_token.get("user_id", None)

            current_user = User.objects.get(pk=user_id)  # Assuming your user model is named User

            cart = self.get_cart_for_user(current_user)
            serialized_cart = Cart_MSerializer(cart).data
            cart_items = Cart_Details.objects.filter(Cart_ID=cart)
            cart_items_serializer = Cart_DetailsSerializer(cart_items, many=True).data

            item_ids = cart_items.values_list('P_ID', flat=True)
            menu_items = Product_M.objects.filter(P_ID__in=item_ids)
            menu_serializer = ProductSerializer(menu_items, many=True).data

            response_data = {
                    'cart': serialized_cart,
                    'cart_items': cart_items_serializer,
                    'menus': menu_serializer,
                    'message': 'Cart retrieved successfully'
                }

            return Response(response_data)
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

  
    def post(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "")

        try:
            decoded_token = jwt.decode(token, 'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m', algorithms=['HS256'])
            user_id = decoded_token.get("user_id", None)

            current_user = User.objects.get(pk=user_id)  # Assuming your user model is named User

            # Retrieve or create a cart based on the user making the request
            cart_obj, created = Cart_M.objects.get_or_create(User_ID=current_user)
            cart_id = cart_obj.CartID
            data = request.data.copy()
            data['Cart_ID'] = cart_id

            # Validate serializer data
            serializer = Cart_DetailsSerializer(data=data)
            serializer.is_valid(raise_exception=True)

            # Add the selected item to the cart details
            item = serializer.validated_data['P_ID']
            quantity = serializer.validated_data['ItemQuantity']
            subtotal = item.P_Price * quantity
            cmst = item.P_Price * quantity
            cart_details = Cart_Details.objects.filter(Cart_ID=cart_obj, P_ID=item)

            if cart_details.exists():
                cart_detail = cart_details.first()
                cart_detail.ItemQuantity += quantity
                cart_detail.Subtotal = cart_detail.ItemQuantity * cart_detail.P_ID.P_Price
                cart_detail.save()
            else:
                # If the cart detail does not exist, create a new one
                Cart_Details.objects.create(Cart_ID=cart_obj, P_ID=item, ItemQuantity=quantity, Subtotal=subtotal)

            # Update the total in the Cart_M model
            cart_obj.Total += subtotal
            cart_obj.Subtotal += cmst
            cart_obj.save()
            response_data = {
                'message': 'Item added to the cart successfully',
                'cart': Cart_MSerializer(cart_obj).data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

    # def put(self, request, *args, **kwargs):
    #     auth_header = request.headers.get("Authorization", "")
    #     token = auth_header.replace("Bearer ", "")

    #     try:
    #         decoded_token = jwt.decode(token, 'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m', algorithms=['HS256'])
    #         user_id = decoded_token.get("user_id", None)

    #         current_user = User.objects.get(pk=user_id)  # Assuming your user model is named User

    #         # Retrieve or create a cart based on the user making the request
    #         cart_obj, created = Cart_M.objects.get_or_create(User_ID=current_user)
    #         cart_id = cart_obj.CartID

    #         # Validate serializer data
    #         serializer = Cart_DetailsSerializer(data=request.data)
    #         serializer.is_valid(raise_exception=True)

    #         # If an offer is already applied, remove its discount from the total
            
    #         # Apply new offer to the entire cart or calculate total without discount

    #         # Find or create the cart detail for the item
    #         item = serializer.validated_data['P_ID']
    #         # quantity = serializer.validated_data['ItemQuantity']
    #         # subtotal = item.P_Price 
    #         # subtotal = item.P_Price * quantity

    #         # Try to find an existing cart detail for the item
    #         cart_detail, created = Cart_Details.objects.get_or_create(Cart_ID=cart_obj, P_ID=item)

    #         # If the cart detail already exists, update the quantity and subtotal
    #         cart_detail.ItemQuantity += 1
    #         # cart_detail.ItemQuantity += quantity
    #         cart_detail.Subtotal = item.P_Price * cart_detail.ItemQuantity
    #         cart_detail.save()

    #         # Update the total in the Cart_M model
    #         cart_obj.Total = cart_detail.Subtotal
    #         cart_obj.Subtotal += item.P_Price 
    #         # cart_obj.Subtotal = item.P_Price * cart_detail.ItemQuantity
    #         cart_obj.save()

    #         response_data = {
    #             'message': 'Item updated in the cart successfully',
    #             'cart': Cart_MSerializer(cart_obj).data,
    #         }

    #         return Response(response_data, status=status.HTTP_200_OK)

    #     except jwt.ExpiredSignatureError:
    #         return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
    #     except jwt.InvalidTokenError:
    #         return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

    # def put(self, request, *args, **kwargs):
    #     auth_header = request.headers.get("Authorization", "")
    #     token = auth_header.replace("Bearer ", "")

    #     try:
    #         decoded_token = jwt.decode(token, 'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m', algorithms=['HS256'])
    #         user_id = decoded_token.get("user_id", None)

    #         current_user = User.objects.get(pk=user_id)  # Assuming your user model is named User

    #         # Retrieve or create a cart based on the user making the request
    #         cart_obj, created = Cart_M.objects.get_or_create(User_ID=current_user)
    #         cart_id = cart_obj.CartID

    #         # Validate serializer data
    #         serializer = Cart_DetailsSerializer(data=request.data)
    #         serializer.is_valid(raise_exception=True)

    #         # Find or create the cart detail for the item
    #         item = serializer.validated_data['P_ID']

    #         # Try to find an existing cart detail for the item
    #         cart_detail, created = Cart_Details.objects.get_or_create(Cart_ID=cart_obj, P_ID=item)

    #         # If the cart detail already exists, update the quantity and subtotal
    #         cart_detail.ItemQuantity += 1
    #         cart_detail.Subtotal = item.P_Price * cart_detail.ItemQuantity
    #         cart_detail.save()

    #         # Recalculate the total for the entire cart
    #         cart_details = Cart_Details.objects.filter(Cart_ID=cart_obj)
    #         total = sum(cart_item.Subtotal for cart_item in cart_details)
    #         cart_obj.Total = total
    #         cart_obj.save()

    #         response_data = {
    #             'message': 'Item updated in the cart successfully',
    #             'cart': Cart_MSerializer(cart_obj).data,
    #         }

    #         return Response(response_data, status=status.HTTP_200_OK)

    #     except jwt.ExpiredSignatureError:
    #         return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
    #     except jwt.InvalidTokenError:
    #         return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    def put(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "")

        try:
            decoded_token = jwt.decode(token, 'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m', algorithms=['HS256'])
            user_id = decoded_token.get("user_id", None)

            current_user = User.objects.get(pk=user_id)  # Assuming your user model is named User

            # Retrieve or create a cart based on the user making the request
            cart_obj, created = Cart_M.objects.get_or_create(User_ID=current_user)
            cart_id = cart_obj.CartID

            # Validate serializer data
            serializer = Cart_DetailsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # Find or create the cart detail for the item
            item = serializer.validated_data['P_ID']

            # Try to find an existing cart detail for the item
            cart_detail, created = Cart_Details.objects.get_or_create(Cart_ID=cart_obj, P_ID=item)

            # If the cart detail already exists, update the quantity and subtotal
            cart_detail.ItemQuantity += 1
            cart_detail.Subtotal = item.P_Price * cart_detail.ItemQuantity
            cart_detail.save()

            # Recalculate the subtotal for the entire cart
            cart_details = Cart_Details.objects.filter(Cart_ID=cart_obj)
            cart_obj.Subtotal = sum(cart_item.Subtotal for cart_item in cart_details)
            
            # Update the total for the entire cart
            cart_obj.Total = cart_obj.Subtotal  # Assuming there are no additional discounts
            cart_obj.save()

            response_data = {
                'message': 'Item updated in the cart successfully',
                'cart': Cart_MSerializer(cart_obj).data,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
   
    def patch(self, request, *args, **kwargs):

        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "")

        try:
            decoded_token = jwt.decode(token, 'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m', algorithms=['HS256'])
            user_id = decoded_token.get("user_id", None)

            current_user = User.objects.get(pk=user_id)  # Assuming your user model is named User

            # Retrieve or create a cart based on the user making the request
            cart_obj, created = Cart_M.objects.get_or_create(User_ID=current_user)
            cart_id = cart_obj.CartID

            serializer = Cart_DetailsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # Find or create the cart detail for the item
            item = serializer.validated_data['P_ID']
            quantity = serializer.validated_data['ItemQuantity']
            subtotal = item.P_Price * quantity

            # Try to find an existing cart detail for the item
            try:
                cart_detail = Cart_Details.objects.get(Cart_ID=cart_obj, P_ID=item)

                # If the cart detail already exists, update the quantity and subtotal
                if cart_detail.ItemQuantity > 1:
                    # Decrease the item quantity by 1
                    cart_detail.ItemQuantity -= 1
                    # Update the subtotal based on the new quantity
                    cart_detail.Subtotal = item.P_Price * cart_detail.ItemQuantity 
                    cart_detail.save()
                else:
                    cart_detail.delete()

                # Recalculate total and subtotal for the cart
                cart_details = Cart_Details.objects.filter(Cart_ID=cart_obj)
                cart_obj.Subtotal = sum(cart_item.Subtotal for cart_item in cart_details)
                cart_obj.Total = cart_obj.Subtotal  # Assuming there are no additional discounts

                cart_obj.save()

            except Cart_Details.DoesNotExist:
                pass

            # Update the total in the Cart_M model

            response_data = {
                'message': 'Item updated in the cart successfully',
                'cart': Cart_MSerializer(cart_obj).data,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        

from django.http import Http404


class CartDetailsDeleteView(APIView):
    def delete(self, request, cart_item_id, *args, **kwargs):
        try:
            # Attempt to retrieve the Cart_Details object
            cart_item = Cart_Details.objects.get(pk=cart_item_id)
        except Cart_Details.DoesNotExist:
            # If the object doesn't exist, return a 404 response
            raise Http404("Cart item does not exist")

        # Retrieve the parent cart of the cart item
        cart = cart_item.Cart_ID

        # Update total and subtotal in the cart
        cart.Total -= cart_item.Subtotal
        cart.Subtotal -= cart_item.Subtotal

        # Save the updated cart
        cart.save()

        # Delete the cart item
        cart_item.delete()

        return Response({'message': 'Cart item deleted successfully'})