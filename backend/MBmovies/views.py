from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

    
class MovieList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_M.objects.all()
    serializer_class = MovieSerializer
    
class MovieImgList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Img.objects.all()
    serializer_class = Movie_ImgSerializer
    
class Movie_Director_MList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Director_M.objects.all()
    serializer_class = Movie_Director_MSerializer
    
class Movie_DirectorList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Director.objects.all()
    serializer_class = Movie_DirectorSerializer
    
class Movie_Producer_MList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Producer_M.objects.all()
    serializer_class = Movie_Producer_MSerializer
    
class Movie_ProducerList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Producer.objects.all()
    serializer_class = Movie_ProducerSerializer
    
class Movie_Cast_MList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Cast_M.objects.all()
    serializer_class = Movie_Cast_MSerializer
    
class Movie_CastList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Cast.objects.all()
    serializer_class = Movie_CastSerializer
    
class Movie_Genre_MList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Genre_M.objects.all()
    serializer_class = Movie_Genre_MSerializer
    
class Movie_GenreList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Genre.objects.all()
    serializer_class = Movie_GenreSerializer
    
class Movie_Language_MList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Language_M.objects.all()
    serializer_class = Movie_Language_MSerializer
    
class Movie_LanguageList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Language.objects.all()
    serializer_class = Movie_LanguageSerializer
    
class Movie_Type_MList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Type_M.objects.all()
    serializer_class = Movie_Type_MSerializer
    
class Movie_TypeList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Movie_Type.objects.all()
    serializer_class = Movie_TypeSerializer


    
