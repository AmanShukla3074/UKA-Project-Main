from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

class ShowtimeList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        movie = self.request.query_params.get('movie')
        theater = self.request.query_params.get('theater')
        movie_type = self.request.query_params.get('movie_type')
        language = self.request.query_params.get('language')

        queryset = ShowTime_M.objects.all()

        if movie:
            queryset = queryset.filter(M_ID=movie)

        if theater:
            queryset = queryset.filter(Screen_M__T_ID=theater)

        if movie_type:
            queryset = queryset.filter(M_Type=movie_type)

        if language:
            queryset = queryset.filter(M_Language=language)

        serializer = ShowtimeSerializer(queryset, many=True)
        return Response(serializer.data)
    
       

class SeatList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Seat_M.objects.all()
    serializer_class = SeatSerializer

class SeatInShowtimeList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SeatInShowtimeSerializer

    def get_queryset(self):
        showtime_id = self.kwargs['showtime_id']
        return SeatInShowtime.objects.filter(showtime_id=showtime_id)
    

    
class TheaterList(APIView):
    permission_classes = [IsAuthenticated]
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
    
    def post(self,request):
        serializer = TheaterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg':'Theater added'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class ComplaintView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        # serializer = ComplaintGetSerializer(data=request.data)
        user_id = request.user.id

        # Adding User_ID to the request data
        request_data = {**request.data, 'User_ID': user_id}

        # serializer = ComplaintPostSerializer(data=request_data)
        serializer = ComplaintPostSerializer(data=request_data)
        # Adding User_ID to the request data
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
        
        complaint = Complaint_MB.objects.filter(User_ID=request.user)
        # complaint = Complaint_MB.objects.all()
        serializer = ComplaintGetSerializer(complaint, many=True)
        return Response(serializer.data)



class BookingSeatView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        # serializer = ComplaintGetSerializer(data=request.data)
        serializer = BookingSeatPostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # Complaint_MB=serializer.save()
            return Response({'msg':'Seat Submitted'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
               
        complaint = Booking_Seat_M.objects.all()
        serializer = BookingSeatGetSerializer(complaint, many=True)
        return Response(serializer.data)




class BookingView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        # serializer = ComplaintGetSerializer(data=request.data)
        serializer = BookingPostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # Complaint_MB=serializer.save()
            return Response({'msg':'Seat Submitted'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        # complaint_id = kwargs.get('pk')

        user =request.user

        # if complaint_id is not None:
        #     theater = Complaint_MB.objects.get(pk=complaint_id)
        #     serializer = ComplaintGetSerializer(theater)
        #     return Response(serializer.data)

        complaint = Booking_M.objects.filter(User_ID=user)
        serializer = BookingGetSerializer(complaint, many=True)
        return Response(serializer.data)

