from django.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.postgres.fields import ArrayField
# from ..user.models import User

# Create your models here.
class Property(models.Model):
	property_id = models.IntegerField(primary_key=True)
	address = models.CharField(max_length=50)
	#avgRating = models.FloatField()
	location = PointField(srid=4326)
	numGuests = models.IntegerField()
	description = models.CharField(max_length = 1000)
	name = models.CharField(max_length=100)
	buildingType = models.CharField(max_length=20)
	price = models.FloatField()
	'''
		models.CASCADE -> when the referenced object is deleted, also delete the 
	objects that have references to it.
		models.PROTECT -> Forbid the the deletion of referenced object.
	'''

	# reservation_IDs = models.ForeignKey(Reservation, on_delete=models.PROTECT, default=0)
	#if the feature is deleted, the property should still exist;
	features = ArrayField(models.CharField(max_length=250))
	images = ArrayField(models.CharField(max_length=50))
	# owner_ID = models.ForeignKey(User, on_delete=models.PROTECT)
	# rating_IDs = models.ForeignKey(Rating, on_delete=models.PROTECT)
	# images = ImageField(blank=True, null=True)
	numBathrooms = models.IntegerField()
	numBeds = models.IntegerField()
	numRooms = models.IntegerField()

	
	def __str__ (self):
		return 'property name:'+self.name+'address:'+self.address+'numGuests:'+self.numGuests

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
	