from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   path('showtime/', ShowtimeList.as_view(), name='movie-list'),
   path('theater/', TheaterList.as_view(), name='movie-list'),
   # path('theater-movie/', TheaterMovieList.as_view(), name='movie-list'),
   path('theater/<int:pk>/', TheaterList.as_view(), name='product-detail'),

]