from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   path('music/', MusicAPIView.as_view(), name='music-list'),
   path('music/<int:music_id>/', MusicAPIView.as_view(), name='music-detail'),
   path('music/<int:music_id>/stream/', StreamMusicIncrement.as_view(), name='stream_music'),

   #add artist in music
   path('music/<int:music_id>/add-artists/', AddArtistsToMusic.as_view(), name='add-artists-to-music'),

   #Profile


   #Artist Search
   path('artist-search/<int:artist_id>/', ArtistSearchView.as_view(), name='artist'),

   path('album/', AlbumApiView.as_view(), name='album-list'),
   path('album/<int:album_id>/', AlbumApiView.as_view(), name='album-detail'),

   #add artist in album
   path('album/<int:album_id>/add-artists/', AddArtistsToAlbum.as_view(), name='add-artists-to-album'),
  
   path('artist/', ArtistViewSet.as_view({'get': 'list', 'post': 'create'}), name='music-list'),
   path('artist/<int:pk>/', ArtistViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='music-detail'),

#Playlist

   path('playlist/', PlaylistViews.as_view({'get': 'list', 'post': 'create'}), name='playlist-list'),
   path('playlist/<int:pk>/', PlaylistViews.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='playlist-detail'),
  

   path('playlist-Music/', PlaylistMusicViews.as_view(), name='playlist-Music-list'),
   path('playlist-Music/<int:pk>/', PlaylistMusicViews.as_view(), name='playlist-Music-detail'),
  
   # path('playlist-Music/', PlaylistMusicViews.as_view({'get': 'list', 'post': 'create'}), name='playlist-Music-list'),
   # path('playlist-Music/<int:pk>/', PlaylistMusicViews.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='playlist-Music-detail'),
   path('liked-music/', LikedMusicAPIView.as_view(), name='liked-music'),
   path('liked-music/<int:music_id>/', LikedMusicAPIView.as_view(), name='delete-liked-music'),

   path('search/', SearchView.as_view(), name='music_search'),

   path('analytics/', AnalyticsView.as_view(), name='analytics-list'),
   path('analytics/<int:pk>/', AnalyticsView.as_view(), name='analytics-detail'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MUSICAUDIO_MEDIA_URL, document_root=settings.MUSICAUDIO_MEDIA_ROOT)
    urlpatterns += static(settings.MUSICCOVERIMGS_MEDIA_URL, document_root=settings.MUSICCOVERIMGS_MEDIA_ROOT)