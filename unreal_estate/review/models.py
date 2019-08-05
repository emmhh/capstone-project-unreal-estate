from django.db import models
from django.core.exceptions import ObjectDoesNotExist

<<<<<<< HEAD
class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    booking_id = models.IntegerField()
    review = models.FloatField()
    
    property_id = models.IntegerField()
    startDate = models.DateField()
    endDate = models.DateField()
    bookingTime = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    num_guests = models.IntegerField(default=0)
=======
class Rating(models.Model):
    rating_id = models.AutoField(primary_key=True)
    property_id = models.ForeignKey('advertising.Property', on_delete=models.CASCADE, null=True)
    user_id = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True)
    booking_id = models.ForeignKey('booking.Booking', on_delete=models.CASCADE, null=True)
    value = models.FloatField(default=0.0)
    date=models.DateTimeField(auto_now_add=True)
    notes = models.TextField(default='', blank=True)

    def __str__ (self):
        return self.rating_id + self.property_id + self.value
>>>>>>> b2e38a6142709814340c86b495e8cffe53331925
