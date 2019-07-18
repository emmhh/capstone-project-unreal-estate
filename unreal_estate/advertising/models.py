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
class PropertyCliveTest(models.Model):
    suburb = models.CharField(max_length=300, default=None)
    city  = models.CharField(max_length=300, default=None)
    latitude = models.FloatField(default=None)
    longitude = models.FloatField(default=None)
    post_code = models.IntegerField(default=None)
    num_bathroom = models.FloatField(default=None)
    num_guests = models.IntegerField(default=None)
    description = models.CharField(max_length = 1500)
    space = models.CharField(max_length=1500, default=None)
    name = models.CharField(max_length=300)
    prices = models.CharField(max_length=30, default=None)
    avg_rating = models.FloatField(default=None)
    image = models.URLField(max_length=300, default=None, null=True)
    '''
        models.CASCADE -> when the referenced object is deleted, also delete the 
    objects that have references to it.
        models.PROTECT -> Forbid the the deletion of referenced object.
    '''
    def get_property_by_id(self, property_id):
        try:
            return PropertyCliveTest.objects.get(property_ID=property_id)
        except ObjectDoesNotExist:
            print('property does not exist for calculation of avg rating')
            return 0

    def __str__ (self):
        return 'name:' + self.name + 'suburb: ' + self.suburb + 'city: ' + self.city + 'latitude: ' + self.latitude + 'longitude: ' + self.longitude + 'post_code: ' + self.post_code + 'num_bathroom: ' + self.num_bathroom + 'num_guests: ' + self.num_guests + 'description: ' + self.description + 'space: ' + self.space + 'prices: ' + self.prices + 'avg_rating: ' + self.avg_rating + 'image: ' + self.image

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
    property = models.ForeignKey(PropertyCliveTest, on_delete=models.CASCADE, default=None, null=True)
    is_anonymous = models.BooleanField(default=False)
    # renter = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.CharField(max_length= 500)

    def __str__ (self):
        return self.property + self.value

# class Property(models.Model):
#     property_id    = models.IntegerField()
#     address        = models.CharField(max_length=100)
#     numGuests      = models.IntegerField()
#     description    = models.CharField(max_length=100)
#     name           = models.CharField(max_length=100)
#     buildingType   = models.CharField(max_length=100)
#     features       = models.CharField(max_length=100)
#     price          = models.FloatField()
#     owner_id       = models.IntegerField()
#     images         = models.CharField(max_length=100)
#     numBathrooms   = models.IntegerField()
#     numBeds        = models.IntegerField()
#     numRooms       = models.IntegerField()
#     location       = models.FloatField()
#     # address = models.CharField(max_length=30)
#     # suburb = models.CharField(max_length=30, default=None)
#     # city  = models.CharField(max_length=30, default=None)
#     # latitude = models.FloatField(default=None)
#     # longitude = models.FloatField(default=None)
#     # post_code = models.IntegerField(default=None)
#     # num_room = models.IntegerField(default=None)
#     # num_bathroom = models.FloatField(default=None)
#     # num_guests = models.IntegerField(default=None)
#     # description = models.CharField(max_length = 1500)
#     # space = models.CharField(max_length=1500, default=None)
#     # name = models.CharField(max_length=100)
#     # building_type = models.CharField(max_length=20)
#     # prices = models.FloatField()
#     # avg_rating = models.FloatField(default=None)
#     # image = models.URLField(max_length=300, default=None, null=True)
#     '''
#         models.CASCADE -> when the referenced object is deleted, also delete the 
#     objects that have references to it.
#         models.PROTECT -> Forbid the the deletion of referenced object.
#     '''
    
#     def __str__ (self):
#         return 'property name:'+self.name+'location:'+self.location+'num_Guests:'+self.num_Guests

#     def ratings(self, property_ID):
#         try:
#             tmp = Rating.objects.get(property_ID=property_ID)
#             sum = 0
#             count = 0
#             for num in tmp:
#                 sum = sum + num
#                 count = count+1
#             avg = sum/count
#             return avg
#         except ObjectDoesNotExist:
#             print('property does not exist for calculation of avg rating')
#             return 0
