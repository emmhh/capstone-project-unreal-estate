import re
import googlemaps
import json
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


gmaps = googlemaps.Client(key='AIzaSyClDGqfGMbApqkFQ3SZbxG6dv7h7FDPCcA')
propertyManager = None
# Create your models here.

class PropertyManager():
	def __init__(self, properties=[]):
		self.properties = properties

	def primarySearch(self, location, startDate, endDate, numGuests, maxDistance=10):
		properties = self.properties
		properties = self.searchByLocation(location, maxDistance, properties)
		properties = self.searchByPropertyAvailablity(startDate, endDate, properties)
		properties = self.searchByPropertyNumGuests(numGuests, properties)
		return properties


	def searchByPropertyName(self, name, properties=None):
		if properties == None:
				properties = self.properties
		results = []
		for p in properties:
			if re.search(name, p.name, re.IGNORECASE):
				results.append(p)
		return results

	def searchByLocation(self, location, maxDistance=10, properties=None):
		if properties == None:
				properties = self.properties
		maxDistance *= 1000 #km to m
		results = []
		for p in properties:
			distance = gmaps.distance_matrix(location, p.location)['rows'][0]['elements'][0]
			if distance['distance']['value'] <= maxDistance:
				results.append(p)
		return results

	def searchByPropertyFeatures(self, features, properties=None):
		if properties == None:
				properties = self.properties
		results = []
		for p in properties:
			for f in p.features:
				if re.search(features, f, re.IGNORECASE):
					results.append(p)
					break
		return results

	def searchByPropertyAvailablity(self, startDate, endDate, properties=None):
		if properties == None:
				properties = self.properties
		results = []
		for p in properties:
			available = True
			for b in p.bookings:
				if startDate < b.endDate and endDate > b.startDate:
					available = False
					break
			if available:
				results.append(p)
		return results

	def searchByPropertyNumGuests(self, numGuests, properties=None):
		if properties == None:
			properties = self.properties		
		results = []
		for p in properties:
			if p.numGuests == numGuests:
				results.append(p)
		return results


	def addProperty(self, newProperty):
		self.properties.append(newProperty)

@csrf_exempt
def handleRequests(request):
	print("recieved request")
	print(request.body.decode('utf-8'))
	requestObj = json.loads(request.body.decode('utf-8'))
	address = requestObj['address']
	checkin = requestObj['checkin'].split("(")
	checkin = checkin[0]
	checkout = requestObj['checkout'].split("(")
	checkout = checkout[0]
	checkin = datetime.datetime.strptime(checkin, "%a %b %d %Y %H:%M:%S GMT%z ")
	checkout = datetime.datetime.strptime(checkout, "%a %b %d %Y %H:%M:%S GMT%z ")
	numGuests = requestObj['numGuests']
	global propertyManager
	if not propertyManager:
		# You're gonne need to keep a global instance of this or something like that
		# global propertyManager
		propertyManager = PropertyManager()

	properties = propertyManager.primarySearch(address, checkin, checkout, numGuests)
	print(properties)
	# usually uou would return properties but for testing purposes I will not
	# return properties
	test = {}
	for i in range(0,10):
		test[i] = "object here"
	return HttpResponse(json.dumps(test))


