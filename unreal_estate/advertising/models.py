from django.db import models
from django.core.exceptions import ObjectDoesNotExist
# from ..user.models import User

# class Feature(models.Model):
#     description=models.CharField(max_length=50)
#     # if the proeprty is deleted, the feature should still exist
#     # property = models.ForeignKey(Property, on_delete=models.PROTECT)
#     def __str__ (self):
#         return self.description

# Create your models here.
class Property(models.Model):
    # address = models.CharField(max_length=30)
    suburb = models.CharField(max_length=30, default=None)
    city  = models.CharField(max_length=30, default=None)
    latitude = models.FloatField(default=None)
    longitude = models.FloatField(default=None)
    post_code = models.IntegerField(default=None)
    num_room = models.IntegerField(default=None)
    num_bathroom = models.FloatField(default=None)
    num_guests = models.IntegerField(default=None)
    description = models.CharField(max_length = 1500)
    space = models.CharField(max_length=1500, default=None)
    name = models.CharField(max_length=100)
    building_type = models.CharField(max_length=20)
    prices = models.FloatField()
    avg_rating = models.FloatField(default=None)
    image = models.URLField(max_length=300, default=None, null=True)
    '''
        models.CASCADE -> when the referenced object is deleted, also delete the 
    objects that have references to it.
        models.PROTECT -> Forbid the the deletion of referenced object.
    '''
    
    def __str__ (self):
        return 'property name:'+self.name+'locatiosn:'+self.location+'num_Guests:'+self.num_Guests

    def ratings(self, property_ID):
        try:
            tmp = Rating.objects.get(property_ID=property_ID)
            sum = 0
            count = 0
            for num in tmp:
                sum = sum + num
                count = count+1
            avg = sum/count
            return avg
        except ObjectDoesNotExist:
            print('property does not exist for calculation of avg rating')
            return 0

class Rating(models.Model):
    value = models.IntegerField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE, default=None, null=True)
    is_anonymous = models.BooleanField(default=False)
    # renter = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.CharField(max_length= 500)

    def __str__ (self):
        return self.property + self.value