from django.db import models
# from ..user.models import User

class Feature(models.Model):
    description=models.CharField(max_length=50)
    # if the proeprty is deleted, the feature should still exist
    # property = models.ForeignKey(Property, on_delete=models.PROTECT)
    def __str__ (self):
        return self.description

# Create your models here.
class Property(models.Model):
    # address = models.CharField(max_length=30)
    suburb = models.CharField(max_length=30, default=None)
    city  = models.CharField(max_length=30, default=None)
    latitude = models.FloatField(default=None)
    longitude = models.FloatField(default=None)
    post_code = models.IntegerField(default=None)
    avg_Rating = models.IntegerField()
    num_Guests = models.IntegerField()
    description = models.CharField(max_length = 500)
    name = models.CharField(max_length=30)
    building_type = models.CharField(max_length=20)
    prices = models.IntegerField()
    '''
        models.CASCADE -> when the referenced object is deleted, also delete the 
    objects that have references to it.
        models.PROTECT -> Forbid the the deletion of referenced object.
    '''

    # reservation_IDs = models.ForeignKey(Reservation, on_delete=models.PROTECT, default=0)
    #if the feature is deleted, the property should still exist;
    features = models.ManyToManyField(Feature)
    # owner_ID = models.ForeignKey(User, on_delete=models.PROTECT)
    # rating_IDs = models.ForeignKey(Rating, on_delete=models.PROTECT)
    images = models.URLField(max_length=300, default=None, null=True)
    
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
        except Rating.DoesNotExist:
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

class Reservation(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    # start_year = models.CharField(max_length=4)
    # end_year = models.CharField(max_length=4)
    # start_month = models.CharField(max_length=4)
    # end_month = models.CharField(max_length=4)
    notes = models.CharField(max_length=500)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, default=None, null=True)
    fee = models.IntegerField()
    #user_id = models.ForeignKey(User, on_delete=models.PROTECT)FIXME: add these back after user is implemented
    # owner_id = models.ForeignKey(User, on_delete=models.CACADE)FIXME:
    def __str__ (self):
        return 'start_date:'+self.start_date+'end_date'+self.end_date+'notes:'+self.notes
    