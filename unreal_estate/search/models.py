import googlemaps
from django.db import models
from advertising.models import Property
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D


gmaps = googlemaps.Client(key='AIzaSyClDGqfGMbApqkFQ3SZbxG6dv7h7FDPCcA')
# Create your models here.

class PropertyManager(models.Model):

	def primarySearch(location, startDate, endDate, numGuests, maxDistance=2):
		geocode_result = gmaps.geocode(location)
		lat = geocode_result[0]["geometry"]["location"]["lat"]
		lng = geocode_result[0]["geometry"]["location"]["lng"]
		ref_location = Point(lng, lat, srid=4326)
		properties = Property.objects.filter(location__distance_lte=(ref_location, D(km=maxDistance)), numGuests=numGuests).values()
		properties = pointToLatLng(properties)
		return properties


	def searchByPropertyName(name):
		results = Property.objects.filter(name__contains=name)
		results = pointToLatLng(results)
		return results

	def searchByLocation(location, maxDistance=10):
		geocode_result = gmaps.geocode(location)
		lat = geocode_result[0]["geometry"]["location"]["lat"]
		lng = geocode_result[0]["geometry"]["location"]["lng"]
		ref_location = Point(lat, lng, srid=4326)
		results = Property.objects.filter(location__distance_lte=(ref_location, D(km=maxDistance))).values()
		results = pointToLatLng(results)
		return results

	# needs features to be an array of features
	def searchByPropertyFeatures(features):
		results = Property.objects.filter(features__contains=features).values()
		results = pointToLatLng(results)
		return results

	def searchByPropertyAvailablity(startDate, endDate):
		pass
		# need help with this??, then fix it in primarySearch too

	def searchByPropertyNumGuests(numGuests):
		results = Property.objects.filter(numGuests=numGuests).values()
		results = pointToLatLng(results)
		return results

def pointToLatLng(properties):
	for prop in properties:
		prop['lat'] = prop['location'].x
		prop['lng'] = prop['location'].y
		prop['location'] = None
	return properties