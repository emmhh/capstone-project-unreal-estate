from django.db import models
from django.core.exceptions import ObjectDoesNotExist

class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    property_id = models.IntegerField()
    startDate = models.DateField()
    endDate = models.DateField()
    bookingTime = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    num_guests = models.IntegerField(default=0)
