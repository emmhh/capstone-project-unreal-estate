from django.urls import path
from . import booking

urlpatterns = [
    path('', booking.BookingFunction ),
    path('BID/<int:booking_id>', booking.BookingDetailsBID),
    path('delete/<int:booking_id>', booking.BookingDetailsDelete),
    path('PID/<int:property_id>', booking.BookingDetailsPID),
    path('UID', booking.BookingDetailsUID)
]
