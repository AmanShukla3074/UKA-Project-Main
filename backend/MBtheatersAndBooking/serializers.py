from rest_framework import serializers
from .models import *
from MBmovies.serializers import Movie_ImgSerializer


class MovieSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    def get_images(self,obj):
        movie_Img = Movie_Img.objects.filter(M_ID=obj)
        serializer = Movie_ImgSerializer(movie_Img, many=True)
        return serializer.data 

    class Meta:
        model=Movie_M
        fields=['M_ID','M_Name','M_Age_Certification','images']




class ScreenSerializer(serializers.ModelSerializer):
    Shows = serializers.SerializerMethodField()
   
    def get_Shows(self,obj):
        movie_Img = ShowTime_M.objects.filter(Screen_M=obj)
        serializer = ShowtimeSerializer(movie_Img, many=True)
        return serializer.data  

    class Meta:
        model = Screen_M
        fields = ['Screen_ID','Screen_Name','T_ID','Shows']



class Theater2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Theater_M
        fields = ['T_ID','T_Name','T_Flat_Add','T_Street_Add','T_Pin']

class Screen2Serializer(serializers.ModelSerializer):
    T_ID = Theater2Serializer()
    class Meta:
        model = Screen_M
        fields = ['Screen_ID','Screen_Name','T_ID']



class ShowtimeSerializer(serializers.ModelSerializer):
    Screen_M = Screen2Serializer()
    M_ID = MovieSerializer()

    class Meta:
        model = ShowTime_M
        fields = ['ShowTime_ID','M_ID','Screen_M','StartTime','Date']



class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat_M
        fields = '__all__'

class SeatInShowtimeSerializer(serializers.ModelSerializer):
    seat = SeatSerializer()

    class Meta:
        model = SeatInShowtime
        fields = '__all__'

# class TheaterDetailSerializer(serializers.ModelSerializer):
class TheaterSerializer(serializers.ModelSerializer):
    Screen = serializers.SerializerMethodField()

    def get_Screen(self,obj):
        shows = Screen_M.objects.filter(T_ID=obj)
        serializer = ScreenSerializer(shows, many=True)
        return serializer.data 


    def get_Movies(self,obj):
        shows = Movie_M.objects.filter(T_ID=obj)
        serializer = ScreenSerializer(shows, many=True)
        return serializer.data 
    
    class Meta:
        model = Theater_M
        fields = ['T_ID','T_Name','T_Flat_Add','T_Street_Add','T_Pin','Screen','screens']



class TheaterMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater_M
        fields = ['T_ID','T_Name','T_Flat_Add','T_Street_Add','T_Pin']


class ComplaintPostSerializer(serializers.ModelSerializer):

    # M_ID = MovieSerializer()
    # T_ID = TheaterMiniSerializer()

    class Meta:
        model = Complaint_MB
        fields = '__all__'

class ComplaintGetSerializer(serializers.ModelSerializer):

    # M_ID = MovieSerializer()
    # T_ID = TheaterMiniSerializer()

    M_ID = serializers.PrimaryKeyRelatedField(source='M_ID.M_ID', read_only=True)
    M_Name = serializers.CharField(source='M_ID.M_Name', read_only=True)
    T_ID = serializers.PrimaryKeyRelatedField(source='T_ID.T_ID', read_only=True)
    T_Name = serializers.CharField(source='T_ID.T_Name', read_only=True)
    U_FName = serializers.CharField(source='User_ID.first_name', read_only=True)
    U_LName = serializers.CharField(source='User_ID.last_name', read_only=True)

    class Meta:
        model = Complaint_MB
        fields = ['Complaint_ID','User_ID','M_ID','M_Name','T_ID','T_Name','U_FName','U_LName','Complaint_Desc','Complaint_Date']

