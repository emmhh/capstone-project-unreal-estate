from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.gis.db.models import PointField
from django.contrib.postgres.fields import ArrayField
from review.models import Rating

class Property(models.Model):
    property_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=300, default='', blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    num_guests = models.IntegerField(default=1)
    num_bathrooms = models.IntegerField(default=1)
    num_beds = models.IntegerField(default=1)
    num_rooms = models.IntegerField(default=1)
    description = models.CharField(max_length=2000, default='', blank=True)
    space = models.CharField(max_length=2000, default='', blank=True)
    name = models.CharField(max_length=300)
    features = ArrayField(models.CharField(max_length=250), default=list())
    # This needs to be changed to foreign key once we have Property Owners table ready (both here and in pgAdmin4)
    owner_id = models.IntegerField(null=True)
    price = models.FloatField(default=100.0)
    avg_rating = models.FloatField(default=0.0)
    images = ArrayField(models.CharField(max_length=150), default=list().append('http://wtlrealty.my/admin/property/default.jpg'))
    location = PointField(srid=4326, default=None, null=True)
    building_type = models.CharField(max_length=20, default='', blank=True)


    def get_property_by_id(self, property_id):
        try:
            return Property.objects.get(property_id=property_id)
        except ObjectDoesNotExist:
            print('property does not exist')
            return 0

    def __str__ (self):
        return 'name:' + self.name + 'suburb: ' + self.suburb + 'city: ' + self.city + 'latitude: ' + self.latitude + 'longitude: ' + self.longitude + 'post_code: ' + self.post_code + 'num_bathroom: ' + self.num_bathroom + 'num_guests: ' + self.num_guests + 'description: ' + self.description + 'space: ' + self.space + 'prices: ' + self.prices + 'avg_rating: ' + self.avg_rating + 'image: ' + self.image

    def ratings(self, property_id):
      try:
        tmp = Rating.objects.get(property_id=property_id)
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
