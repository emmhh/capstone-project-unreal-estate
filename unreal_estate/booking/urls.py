from django.urls import path
from . import booking
# from . import views

urlpatterns = [
    path('', booking.Booking ),
]
