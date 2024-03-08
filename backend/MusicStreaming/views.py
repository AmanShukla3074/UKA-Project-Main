from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from rest_framework import generics,status,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.db.models import Q



class ArtistViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the currently logged-in user
        user = self.request.user

        # Filter the queryset to get the artist profile associated with the user
        queryset = Artist_M.objects.filter(User_ID=user)

        return queryset
    def perform_create(self, serializer):
        # Get the user associated with the JWT token
        user = self.request.user
        # Validate that the user doesn't already have an associated artist profile
        if Artist_M.objects.filter(User_ID=user).exists():
            raise ValidationError("User already has an associated artist profile.")

        # Associate the newly created artist with the user
        serializer.save(User_ID=user)


class MusicAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        music_id = kwargs.get('music_id')

        if music_id is not None:
            music = Music_M.objects.get(pk=music_id)
            serializer = MusicSerializer(music)
            return Response(serializer.data)
        
        # Add logic for retrieving music instances if needed
        # artist_id = request.user.artist_profile.Artist_ID  # Assuming the Artist model has a profile linked to the user
        artist_id = Artist_M.objects.get(User_ID=request.user)
        music_instances = Music_M.objects.filter(music_artist__Artist_ID__pk=artist_id.Artist_ID)
        # music_instances = Music_M.objects.filter(music_artist__artist_id=artist_id)

        serializer = MusicSerializer(music_instances, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        try:
            # Retrieve the specific artist instance
            artist_profile = Artist_M.objects.get(User_ID=request.user)
        except Artist_M.DoesNotExist:
            return Response({"detail": "User must have an associated artist profile."},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = MusicSerializer(data=request.data)
        if serializer.is_valid():
            music_instance = serializer.save()

            # Associate the music with the artist using only IDs
            Music_Artist.objects.create(Music_ID_id=music_instance.Music_ID, Artist_ID_id=artist_profile.Artist_ID)

            # Update the serializer data to include the associated artist
            serializer_data = serializer.data
            serializer_data['music_artist'] = [{'Music_ID': music_instance.Music_ID, 'artist': {'Artist_ID': artist_profile.Artist_ID}}]

            return Response(serializer_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        # Add logic for updating a music instance if needed
        music_id = kwargs.get('music_id')
        instance = get_object_or_404(Music_M, Music_ID=music_id)
        serializer = MusicSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        music_id = kwargs.get('music_id')
        instance = get_object_or_404(Music_M, Music_ID=music_id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AddArtistsToMusic(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, music_id):
        try:
            # Retrieve the specific music instance
            music_instance = Music_M.objects.get(Music_ID=music_id)
        except Music_M.DoesNotExist:
            return Response({"detail": "Music does not exist."},
                            status=status.HTTP_404_NOT_FOUND)

        # Check if the current user is the owner of the music
        # Add your authentication logic here

        # Get the list of artist IDs from the request data
        artist_ids = request.data.get('artist_ids', [])

        # Associate the music with the provided artists
        for artist_id in artist_ids:
            try:
                artist = Artist_M.objects.get(Artist_ID=artist_id)
                Music_Artist.objects.create(Music_ID=music_instance, Artist_ID=artist)
            except Artist_M.DoesNotExist:
                return Response({"detail": f"Artist with ID {artist_id} does not exist."},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Artists added successfully."},
                        status=status.HTTP_201_CREATED)

    def delete(self, request, music_id):
        try:
            # Retrieve the specific music instance
            music_instance = Music_M.objects.get(Music_ID=music_id)
        except Music_M.DoesNotExist:
            return Response({"detail": "Music does not exist."}, status=status.HTTP_404_NOT_FOUND)


        artist_ids = request.data.get('artist_ids', [])

        # Disassociate the music from the provided artists
        for artist_id in artist_ids:
            try:
                artist = Artist_M.objects.get(Artist_ID=artist_id)
                Music_Artist.objects.filter(Music_ID=music_instance, Artist_ID=artist).delete()
            except Artist_M.DoesNotExist:
                return Response({"detail": f"Artist with ID {artist_id} does not exist."},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Artists removed successfully."}, status=status.HTTP_200_OK)


class AlbumApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        album_id = kwargs.get('album_id')

        if album_id is not None:
            album = Album_M.objects.get(pk=album_id)
            serializer = AlbumSerializer(album)
            return Response(serializer.data)
        
        # Add logic for retrieving music instances if needed
        artist_id = Artist_M.objects.get(User_ID=request.user)
        album = Album_M.objects.filter(album_artist__Artist_ID__pk=artist_id.Artist_ID)
        serializer = AlbumSerializer(album, many=True)
        return Response(serializer.data)

    def post(self,request,*args,**kwargs):
        try:
            artist_profile=Artist_M.objects.get(User_ID=request.user)
        except Artist_M.DoesNotExist:
            return Response({"detail": "User must have an associated artist profile."},status=status.HTTP_400_BAD_REQUEST)

        serializers=AlbumSerializer(data=request.data)
        if serializers.is_valid():
            album_intance = serializers.save()

            Album_Artist.objects.create(Album_ID_id=album_intance.Album_ID,Artist_ID_id=artist_profile.Artist_ID)

            serializer_data=serializers.data
            serializer_data['Album_artist'] = [{'Album_ID': album_intance.Album_ID, 'artist': {'Artist_ID': artist_profile.Artist_ID}}]

            return Response(serializer_data, status=status.HTTP_201_CREATED)

        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        album_id=kwargs.get('album_id')
        instance = get_object_or_404(Album_M,Album_ID=album_id)
        serializer = AlbumSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        album_id = kwargs.get('album_id')
        instance = get_object_or_404(Album_M, Album_ID=album_id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AddArtistsToAlbum(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, album_id):
        try:
            # Retrieve the specific music instance
            album_instance = Album_M.objects.get(Album_ID=album_id)
        except Album_M.DoesNotExist:
            return Response({"detail": "Album does not exist."},
                            status=status.HTTP_404_NOT_FOUND)

        artist_ids = request.data.get('artist_ids', [])

        # Associate the music with the provided artists
        for artist_id in artist_ids:
            try:
                artist = Artist_M.objects.get(Artist_ID=artist_id)
                Album_Artist.objects.create(Album_ID=album_instance, Artist_ID=artist)
            except Artist_M.DoesNotExist:
                return Response({"detail": f"Artist with ID {artist_id} does not exist."},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Artists added successfully."},
                        status=status.HTTP_201_CREATED)

    def delete(self, request, album_id):
        try:
            # Retrieve the specific music instance
            album_instance = Album_M.objects.get(Album_ID=album_id)
        except Album_M.DoesNotExist:
            return Response({"detail": "Album does not exist."}, status=status.HTTP_404_NOT_FOUND)


        artist_ids = request.data.get('artist_ids', [])

        # Disassociate the music from the provided artists
        for artist_id in artist_ids:
            try:
                artist = Artist_M.objects.get(Artist_ID=artist_id)
                Album_Artist.objects.filter(Album_ID=album_instance, Artist_ID=artist).delete()
            except Artist_M.DoesNotExist:
                return Response({"detail": f"Artist with ID {artist_id} does not exist."},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Artists removed successfully."}, status=status.HTTP_200_OK)


#Search Artist
    
class ArtistSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, artist_id):
        try:
            # Retrieve the specific artist instance
            artist_instance = Artist_M.objects.get(Artist_ID=artist_id)
        except Artist_M.DoesNotExist:
            return Response({"detail": "Artist does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Retrieve all albums associated with the artist
        album_ids = Album_Artist.objects.filter(Artist_ID=artist_instance).values_list('Album_ID', flat=True)
        albums = Album_M.objects.filter(Album_ID__in=album_ids)

        # Serialize the album data
        album_serializer = AlbumSerializer(albums, many=True)

        # Retrieve all music associated with the artist
        music_ids = Music_Artist.objects.filter(Artist_ID=artist_instance).values_list('Music_ID', flat=True)
        music = Music_M.objects.filter(Music_ID__in=music_ids)

        # Serialize the music data
        music_serializer = MusicSerializer(music, many=True)

        return Response({
            "artist": {"Artist_ID": artist_instance.Artist_ID, "Artist_Name": artist_instance.Artist_Name},
            "albums": album_serializer.data,
            "music": music_serializer.data
        }, status=status.HTTP_200_OK)
    

#Playlist
import logging

logger = logging.getLogger(__name__)
import jwt

class PlaylistViews(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Playlist_M.objects.all()
    serializer_class = PlaylistSerializer

    def get_queryset(self):
        # Get the currently logged-in user
        # print("Raw Headers:", self.request.headers)
       
        # user = self.request.user
       
        # logger.info(f"User: {user}")
        # print(user,"aa")
        # # user = 4
        # print("Decoded Token:", user.id)
        # queryset = Playlist_M.objects.filter(User_ID=user.id)

        # return queryset



        auth_header = self.request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "")

    # Manually decode the token
        decoded_token = jwt.decode(token,'django-insecure-q4js*g3v^gw+)k+$hti&4(j7rj$0pql+_1@=85amb0o0*6&@!m' , algorithms=['HS256'])

    # Print the decoded token
        print("Decoded Token:", decoded_token)

    # Extract user information
        user_id = decoded_token.get("user_id", None)
        queryset = Playlist_M.objects.filter(User_ID=user_id)

        return queryset
        # Filter the queryset to get the artist profile associated with the user
       

    # def perform_create(self, serializer):
    #     # Automatically set the user to the one making the request
    #     serializer.save(User_ID=self.request.user)
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(User_ID=self.request.user)

# class PlaylistMusicViews(viewsets.ModelViewSet):
#     queryset = Playlist_Music_M.objects.all()
#     serializer_class = PlaylistMusicSerializer
        
class PlaylistMusicViews(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        playlist_music_instances = Playlist_Music_M.objects.all()
        serializer = GetPlaylistMusicSerializer(playlist_music_instances, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = PostPlaylistMusicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GetPlaylistMusicSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LikedMusicAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # liked_music, created = LikedMusic_Plalist.objects.get_or_create(User_ID=request.user)
        # serializer = GetLikedMusicSerializer(liked_music)
        # return Response(serializer.data)
        liked_music, created = LikedMusic_Plalist.objects.get_or_create(User_ID=request.user)

        # Query LikedMusic entries related to the LikedMusic_Plalist
        liked_music_entries = LikedMusic.objects.filter(LikedMusic_Plalist_ID=liked_music)
        
        # Serialize the data
        serializer = GetLikedMusicSerializer(liked_music_entries, many=True)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        liked_music, created = LikedMusic_Plalist.objects.get_or_create(User_ID=request.user)

        music_id = request.data.get('music_id')
        if not music_id:
            return Response({"detail": "Music ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        existing_entry = LikedMusic.objects.filter(LikedMusic_Plalist_ID=liked_music, Music_ID=music_id).first()

        if existing_entry:
            return Response({"detail": "This music is already liked by the user."}, status=status.HTTP_400_BAD_REQUEST)


        music_instance = Music_M.objects.get(pk=music_id)
        # liked_music_entry = liked_music.objects.create(liked_music=liked_music, music=music_instance)
        liked_music_entry = LikedMusic.objects.create(LikedMusic_Plalist_ID=liked_music, Music_ID=music_instance)


        serializer = PostLikedMusicSerializer(liked_music_entry)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def delete(self, request, *args, **kwargs):
    #     liked_music = self.get_object()

    #     music_id = request.data.get('music_id')

    #     if not music_id:
    #         return Response({"detail": "Music ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    #     try:
    #         liked_music_entry = liked_music.likedmusic_set.get(pk=kwargs['pk'])
    #         liked_music_entry.delete()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     except LikedMusic.DoesNotExist:
    #         return Response({"detail": "Liked music entry does not exist."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request,music_id, *args, **kwargs):
        # Get or create the LikedMusic_Plalist instance for the current user
        liked_music, created = LikedMusic_Plalist.objects.get_or_create(User_ID=request.user)

        # music_id = request.data.get('music_id')

        if not music_id:
            return Response({"detail": "Music ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the specific LikedMusic entry and delete it
            liked_music_entry = LikedMusic.objects.get(LikedMusic_Plalist_ID=liked_music, Music_ID__pk=music_id)
            liked_music_entry.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except LikedMusic.DoesNotExist:
            return Response({"detail": "Liked music entry does not exist."}, status=status.HTTP_404_NOT_FOUND)



class SearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')

        # Search artists
        artist_results = Artist_M.objects.filter(Q(Artist_Name__icontains=query) | Q(Bio__icontains=query))
        artist_serializer = ArtistSerializer(artist_results, many=True).data

        # Search albums
        album_results = Album_M.objects.filter(Q(Album_Title__icontains=query) | Q(Copyrightowner__icontains=query))
        album_serializer = AlbumSerializer(album_results, many=True).data

        # Search music
        music_results = Music_M.objects.filter(Q(Music_Title__icontains=query) | Q(Copyrightowner__icontains=query))
        music_serializer = MusicSerializer(music_results, many=True).data

        return Response({
            'artists': artist_serializer,
            'albums': album_serializer,
            'music': music_serializer,
        })

class StreamMusicIncrement(APIView):
    def post(self, request, music_id):
        try:
            music_instance = Music_M.objects.get(Music_ID=music_id)
        except Music_M.DoesNotExist:
            return Response({"detail": "Music does not exist."},
                            status=status.HTTP_404_NOT_FOUND)

        music_instance.M_Streams += 1
        music_instance.save()

        return Response({"detail": "Music streamed successfully."},
                        status=status.HTTP_200_OK)
    


class AnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Retrieve the specific Analytics_M instance using the provided pk
        analytics_id = kwargs.get('pk')

        if analytics_id is not None:
            try:
                analytics_data = Analytics_M.objects.get(pk=analytics_id)
                serializer = AnalyticsSerializer(analytics_data)
                return Response(serializer.data)
            except Analytics_M.DoesNotExist:
                return Response({"detail": "Analytics entry not found."}, status=404)

        # Retrieve the logged-in user's artist instances
        user = request.user
        queryset = Artist_M.objects.filter(User_ID=user)

        # Retrieve analytics data related to the logged-in user's artists
        analytics_data = Analytics_M.objects.filter(Artist_ID__in=queryset)
        serializer = AnalyticsSerializer(analytics_data, many=True)
        return Response(serializer.data)

    
