from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   # path('showtime/', ShowtimeList.as_view(), name='movie-list'),
   path('theater/', TheaterList.as_view(), name='movie-list'),
   # path('theater-movie/', TheaterMovieList.as_view(), name='movie-list'),
   path('theater/<int:pk>/', TheaterList.as_view(), name='product-detail'),
   path('seats/', SeatList.as_view(), name='seat-list'),
   path('showtimes/', ShowtimeList.as_view(), name='showtime-list'),
   path('showtimes/<int:showtime_id>/seats/', SeatInShowtimeList.as_view(), name='seats-in-showtime-list'),
   path('complaint/', ComplaintView.as_view(), name='complaint-list'),
   path('complaint/<int:pk>/', ComplaintView.as_view(), name='complaint-list'),
]