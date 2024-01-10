from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

    
class MovieList(APIView):
    def get(self, request, *args, **kwargs):
        movies = Movie_M.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    
class DirectorList(APIView):
    def get(self, request, *args, **kwargs):
        movies = Movie_Director.objects.all()
        serializer = Movie_DirectorSerializer(movies, many=True)
        return Response(serializer.data)

    
# class MovieDetail(APIView):
#     def get(self, request, *args, **kwargs):
#         movie_id = kwargs.get('pk')
#         movies = Movie_M.objects.all(pk=movie_id)
#         serializer = MovieDetailsSerializer(movies, many=True)
#         return Response(serializer.data)

class MovieDetail(APIView):
    def get(self, request, *args, **kwargs):
        movie_id = kwargs.get('pk')

        if movie_id is not None:
            product = Movie_M.objects.get(pk=movie_id)
            serializer = MovieDetailsSerializer(product)
            return Response(serializer.data)