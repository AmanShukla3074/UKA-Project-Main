from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   path('movies/', MovieList.as_view(), name='movie-list'),
   path('director/', DirectorList.as_view(), name='director-list'),
   path('movies/<int:pk>/', MovieDetail.as_view(), name='product-detail'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MOVIESIMGS_MEDIA_URL, document_root=settings.MOVIESIMGS_MEDIA_ROOT)
    urlpatterns += static(settings.MOVIESDIRECTORSIMGS_MEDIA_URL, document_root=settings.MOVIESDIRECTORSIMGS_MEDIA_ROOT)
    urlpatterns += static(settings.MOVIESPRODUCERIMGS_MEDIA_URL, document_root=settings.MOVIESPRODUCERIMGS_MEDIA_ROOT)
    urlpatterns += static(settings.MOVIESCASTIMGS_MEDIA_URL, document_root=settings.MOVIESCASTIMGS_MEDIA_ROOT)
    urlpatterns += static(settings.MOVIESGENREIMGS_MEDIA_URL, document_root=settings.MOVIESGENREIMGS_MEDIA_ROOT)
    urlpatterns += static(settings.MOVIESLANGUAGEIMGS_MEDIA_URL, document_root=settings.MOVIESLANGUAGEIMGS_MEDIA_ROOT)