from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics,status
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
       

class SeatList(generics.ListCreateAPIView):
    queryset = Seat_M.objects.all()
    serializer_class = SeatSerializer

class SeatInShowtimeList(generics.ListAPIView):
    serializer_class = SeatInShowtimeSerializer

    def get_queryset(self):
        showtime_id = self.kwargs['showtime_id']
        return SeatInShowtime.objects.filter(showtime_id=showtime_id)
    
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
    



class ComplaintView(APIView):
    def post(self,request):
        # serializer = ComplaintGetSerializer(data=request.data)
        serializer = ComplaintPostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # Complaint_MB=serializer.save()
            return Response({'msg':'Complaint Submitted'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        complaint_id = kwargs.get('pk')
        movie = self.request.query_params.get('movie')
        theater = self.request.query_params.get('theater')

        if complaint_id is not None:
            theater = Complaint_MB.objects.get(pk=complaint_id)
            serializer = ComplaintGetSerializer(theater)
            return Response(serializer.data)

        if movie is not None:
            movies = Complaint_MB.objects.filter(M_ID=movie)
            serializer = ComplaintGetSerializer(movies,many=True)
            return Response(serializer.data)

        if theater is not None:
            theaters = Complaint_MB.objects.filter(T_ID=theater)
            serializer = ComplaintGetSerializer(theaters,many=True)
            return Response(serializer.data)
        
        complaint = Complaint_MB.objects.all()
        serializer = ComplaintGetSerializer(complaint, many=True)
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