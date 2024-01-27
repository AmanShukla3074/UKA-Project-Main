from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   # Products
   path('music/', MusicView.as_view(), name='music-list'),
   path('music/<int:pk>/', MusicView.as_view(), name='music-detail'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MUSICAUDIO_MEDIA_URL, document_root=settings.MUSICAUDIO_MEDIA_ROOT)
    urlpatterns += static(settings.MUSICCOVERIMGS_MEDIA_URL, document_root=settings.MUSICCOVERIMGS_MEDIA_ROOT)