from django.urls import path
from . import booking

urlpatterns = [
    path('', booking.BookingFunction ),
    path('BID/<int:booking_id>', booking.BookingDetailsBID),
    path('UID', booking.BookingDetailsUID)
]
