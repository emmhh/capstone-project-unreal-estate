import googlemaps
from django.db import models
from advertising.models import Property
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D


gmaps = googlemaps.Client(key='AIzaSyClDGqfGMbApqkFQ3SZbxG6dv7h7FDPCcA')
# Create your models here.

class PropertyManager(models.Model):

	def primarySearch(location, startDate, endDate, numGuests, maxDistance=1):
		geocode_result = gmaps.geocode(location)
		lat = geocode_result[0]["geometry"]["location"]["lat"]
		lng = geocode_result[0]["geometry"]["location"]["lng"]
		ref_location = Point(lng, lat, srid=4326)
		properties = Property.objects.filter(location__distance_lte=(ref_location, D(km=maxDistance)), num_guests=numGuests).values()
		properties = pointToNull(properties)
		return properties


	def searchByPropertyName(name):
		results = Property.objects.filter(name__contains=name)
		results = pointToNull(results)
		return results

	def searchByLocation(location, maxDistance=10):
		geocode_result = gmaps.geocode(location)
		lat = geocode_result[0]["geometry"]["location"]["lat"]
		lng = geocode_result[0]["geometry"]["location"]["lng"]
		ref_location = Point(lat, lng, srid=4326)
		results = Property.objects.filter(location__distance_lte=(ref_location, D(km=maxDistance))).values()
		results = pointToNull(results)
		return results

	# needs features to be an array of features
	def searchByPropertyFeatures(features):
		results = Property.objects.filter(features__contains=features).values()
		results = pointToNull(results)
		return results

	def searchByPropertyAvailablity(startDate, endDate):
		pass
		# need help with this??, then fix it in primarySearch too

	def searchByPropertyNumGuests(numGuests):
		results = Property.objects.filter(num_guests=numGuests).values()
		results = pointToNull(results)
		return results

def pointToNull(properties):
	for prop in properties:
		prop['location'] = None
	return properties