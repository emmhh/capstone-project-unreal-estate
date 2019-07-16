from django.db import models

class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    owner_id = models.IntegerField()
    # owner_id = models.ForeignKey('User', on_delete=models.CASCADE)
    property_id = models.IntegerField()
    # property_id = models.ForeignKey('Property', on_delete=models.CASCADE)
    startDate = models.DateField()
    endDate = models.DateField()
    bookingTime = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    notes = models.CharField(max_length=2000)

    