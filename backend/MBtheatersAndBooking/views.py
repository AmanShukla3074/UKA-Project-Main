from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

    
class ShowtimeList(APIView):
    def get(self, request, *args, **kwargs):
        movie = self.request.query_params.get('movie')
        theater = self.request.query_params.get('theater')

        if movie is not None:
            movies = ShowTime_M.objects.filter(M_ID=movie)
            serializer = ShowtimeSerializer(movies,many=True)
            return Response(serializer.data)

        if theater is not None:
            theaters = ShowTime_M.objects.filter(Screen_M__T_ID=theater)
            serializer = ShowtimeSerializer(theaters,many=True)
            return Response(serializer.data)
        
        movies = ShowTime_M.objects.all()
        serializer = ShowtimeSerializer(movies, many=True)
        return Response(serializer.data)
       

    
# class TheaterMovieList(APIView):
#     def get(self, request, *args, **kwargs):
#         movies = Theater_M.objects.all()
#         serializer = TheaterMovieSerializer(movies, many=True)
#         return Response(serializer.data)
 

    
class TheaterList(APIView):
    def get(self, request, *args, **kwargs):
        theater_id = kwargs.get('pk')
        movie = self.request.query_params.get('movie')

        if theater_id is not None:
            theater = Theater_M.objects.get(pk=theater_id)
            serializer = TheaterSerializer(theater)
            return Response(serializer.data)

        if movie is not None:
            movies = Theater_M.objects.filter(screens__showtimes__M_ID__M_ID=movie)
            serializer = TheaterSerializer(movies,many=True)
            return Response(serializer.data)
        
        movies = Theater_M.objects.all()
        serializer = TheaterSerializer(movies, many=True)
        return Response(serializer.data)
    


# class TheaterList(APIView):
#     def get(self, request, *args, **kwargs):

#         movie = self.request.query_params.get('movie')


#         if movie is not None:
#             movies = Theater_M.objects.filter(Screen__Shows__M_ID__M_ID=movie)
#             serializer = TheaterSerializer(movies,many=True)
#             return Response(serializer.data)

#         movies = Theater_M.objects.all()
#         serializer = TheaterSerializer(movies, many=True)
#         return Response(serializer.data)

# class TheaterDetail(APIView):
#     def get(self, request, *args, **kwargs):
#         theater_id = kwargs.get('pk')

#         movie = self.request.query_params.get('movie')


#         if movie is not None:
#             movies = Theater_M.objects.filter(Screen__Shows__M_ID__M_ID=movie)
#             serializer = TheaterSerializer(movies,many=True)
#             return Response(serializer.data)


#         if theater_id is not None:
#             theater = Theater_M.objects.get(pk=theater_id)
#             serializer = TheaterDetailSerializer(theater)
#             return Response(serializer.data)