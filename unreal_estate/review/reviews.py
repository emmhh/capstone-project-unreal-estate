from .models import Rating
from advertising.models import Property
from booking.models import Booking
from django.http import JsonResponse
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json
from django.views.decorators.csrf import csrf_exempt
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../ml/')))
from runner import classify_batch
import logging
# Get an instance of a logger
debugLogger = logging.getLogger('debugLogger')
logger = logging.getLogger(__name__)
@csrf_exempt
def SubmitReview(request):

	# POST
	if (request.method == "POST"):
		debugLogger.debug("Create new review")
		if not (request.user.is_authenticated):
			debugLogger.info("the user is not logged in")
			responce = JsonResponse({'error': "User is not logged in."})
			responce.status_code = 403
			return responce


		# print("post: " + request.body.decode('utf-8'))
		# print("user: " + str(request.user.id))
		json_data = json.loads(request.body.decode('utf-8'))

		propertyInstance = Property.objects.get(property_id=json_data['property_id'])
		bookingInstance = Booking.objects.get(booking_id=json_data['booking_id'])
		reviewDetails = {
			'user_id':	 request.user,
			'property_id': propertyInstance,
			'booking_id':  bookingInstance,
			'value':	   json_data['value'],
			'notes':	   json_data['notes'],
		}

	# Data Validation
	if not (
		reviewDetails['user_id'] and \
		reviewDetails['property_id'] and \
		reviewDetails['booking_id'] and \
		reviewDetails['value'] and \
		reviewDetails['notes']):
		response = JsonResponse({'error': 'Required parameters not met.'})
		response.status_code = 400
		return response
	review = Rating()
	review.user_id = reviewDetails['user_id']
	review.property_id = reviewDetails['property_id']
	review.booking_id = reviewDetails['booking_id']
	review.value = reviewDetails['value']
	review.notes = reviewDetails['notes']
	# Save new review 
	try:
		review.save()
	except IntegrityError as ex:
		if (ex.__cause__.pgcode == '23505'):
			response = JsonResponse({'error': 'duplicate entry'})
			response.status_code = 400
			return response
	UpdateAvgRatingForProperty(json_data['property_id'])
	response = JsonResponse({'review':review.rating_id}) # return booking id to test
	return response

@csrf_exempt
def ReviewDetailsBID(request, booking_id):
	# GET
	if (request.method == "GET"):
		debugLogger.debug("Get booking details BID")
		# Retrieve old booking
		try:
			review = Rating.objects.filter(booking_id=booking_id)[:1].get()
		except ObjectDoesNotExist:
			response = JsonResponse({'error': 'rating does not exist'})
			response.status_code = 403
			return response
		reviewDetails = {
			'rating_id'	 : review.rating_id,
			'property_id'   : review.property_id.property_id,
			'user_id'	   : review.user_id.id,
			'booking_id'	: booking_id,
			'value'		 : review.value,
			'date'		  : review.date,
			'notes'		 : review.notes,
		}
		# print(reviewDetails['rating_id'])
		# print(reviewDetails['property_id'])
		# print(reviewDetails['user_id'])
		# print(reviewDetails['booking_id'])
		# print(reviewDetails['value'])
		# print(reviewDetails['date'])
		# print(reviewDetails['notes'])
		return JsonResponse(reviewDetails)

@csrf_exempt
def GetRatingsByPropertyId (request, property_id):
	print(property_id)
	print(sys.path)
	ratings = Rating.objects.filter(property_id=property_id).values()
	return JsonResponse({'results': list(ratings)})

@csrf_exempt
def GetRatingsByPropertyIdWithClassifications (request, property_id):
	print(property_id)
	ratings = Rating.objects.filter(property_id=property_id).values()
	texts = [r['notes'] for r in ratings]
	if len(texts) > 0:
		classifications = classify_batch(texts)
		for i in range(len(ratings)):
			ratings[i]['ai_rating'] = classifications[i]
	return JsonResponse({'results': list(ratings)})

@csrf_exempt
def UpdateRatingsWithClassifications (request, property_id):
	print(property_id)
	ratings = Rating.objects.filter(property_id=property_id)
	texts = [r.notes for r in ratings]
	if len(texts) > 0:
		classifications = classify_batch(texts)
		for i in range(len(ratings)):
			ratings[i].value = classifications[i]
			ratings[i].save()
	
	ratings = ratings.values()
	
	if len(texts) > 0:
		for i in range(len(ratings)):
			ratings[i]['ai_rating'] = classifications[i]
	UpdateAvgRatingForProperty(property_id)

	return JsonResponse({'results': list(ratings)})

def UpdateAvgRatingForProperty(property_id):
	print(property_id)
	prop = Property.objects.get(property_id=property_id)
	ratings = Rating.objects.filter(property_id=property_id)
	if len(ratings) == 0:
		return

	n = len(ratings)
	k = 0.10
	numTrimmed = int(n*k)
	values = []
	for r in ratings:
		values.append(float(r.value))
	values = sorted(values)
	values = values[numTrimmed:n-numTrimmed]
	avg = sum(values)/len(values)

	avg = round(avg,1)
	
	prop.avg_rating = avg
	prop.save()