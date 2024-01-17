from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics
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