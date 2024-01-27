from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.response import Response


class MusicView(APIView):
    def get(self, request, *args, **kwargs):
        # Fetch music and serialize the data
        music = Music_M.objects.all()
        serialized_music = MusicSerializer(music, many=True).data

        return Response({'music': serialized_music})

    def post(self, request, *args, **kwargs):
        # Create a new music entry
        serializer = MusicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, *args, **kwargs):
        # Update an existing music entry
        music = Music_M.objects.get(pk=pk)
        serializer = MusicSerializer(music, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        # Delete an existing music entry
        music = Music_M.objects.get(pk=pk)
        Music_M.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)