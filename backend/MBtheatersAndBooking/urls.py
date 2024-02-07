from django.urls import path
from .views import *
from .adminviews import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   # path('showtime/', ShowtimeList.as_view(), name='movie-list'),

   path('seats/', SeatList.as_view(), name='seat-list'),
   path('showtimes/', ShowtimeList.as_view(), name='showtime-list'),
   path('showtimes/<int:showtime_id>/seats/', SeatInShowtimeList.as_view(), name='seats-in-showtime-list'),
   path('complaint/', ComplaintView.as_view(), name='complaint-list'),
   path('complaint/<int:pk>/', ComplaintView.as_view(), name='complaint-list'),

   path('bookings/', BookingView.as_view(), name='booking-list-create'),
   path('bookings/<int:pk>/', BookingView.as_view(), name='booking-retrieve-update-destroy'),
   path('booking-seats/', BookingSeatView.as_view(), name='booking-seat-list-create'),
   path('booking-seats/<int:pk>/', BookingSeatView.as_view(), name='booking-seat-retrieve-update-destroy'),


   #admin
   path('admin/booking/', AdminBookingViewSet.as_view({'get': 'list', 'post': 'create'}), name='playlist-list'),
   path('admin/booking/<int:pk>/', AdminBookingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='playlist-detail'),

   path('admin/theater/', TheaterList.as_view(), name='movie-list'),
   # path('theater-movie/', TheaterMovieList.as_view(), name='movie-list'),
   path('admin/theater/<int:pk>/', TheaterList.as_view(), name='product-detail'),


   path('booking-seats/', BookingSeatView.as_view(), name='booking-seat-list-create'),
   path('booking-seats/<int:pk>/', BookingSeatView.as_view(), name='booking-seat-retrieve-update-destroy'),

]