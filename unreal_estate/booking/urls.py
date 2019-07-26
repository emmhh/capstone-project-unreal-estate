from django.urls import path
from . import booking

urlpatterns = [
    path('', booking.BookingFunction ),
    path('<int:booking_id>', booking.BookingDetails)
]
