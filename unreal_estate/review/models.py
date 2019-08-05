from django.db import models

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