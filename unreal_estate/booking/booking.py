from django.http import JsonResponse
from .models import Booking
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json
from django.views.decorators.csrf import csrf_exempt
# import the logging library
import logging

# Get an instance of a logger
debugLogger = logging.getLogger('debugLogger')
logger = logging.getLogger(__name__)
@csrf_exempt
def BookingFunction(request):

    # POST
    if (request.method == "POST"):
        debugLogger.debug("Create new booking")
        if not (request.user.is_authenticated):
            debugLogger.info("the user is not logged in")
            responce = JsonResponse({'error': "User is not logged in."})
            responce.status_code = 403
            return responce
        print(request.body.decode('utf-8'))
        json_data = json.loads(request.body.decode('utf-8'))
        bookingDetails = {
            'user_id': request.user.id,
            # 'user_id': json_data['user_id'],
            'property_id': json_data['property_id'],
            'startDate':  json_data['startDate'],
            'endDate':  json_data['endDate'],
            'price': json_data['total_price'],
            'num_guests' :json_data['guests']
        }

    # Data Validation
    if not (
        bookingDetails['user_id'] and \
        bookingDetails['property_id'] and \
        bookingDetails['startDate'] and \
        bookingDetails['endDate'] and \
        bookingDetails['num_guests'] and \
        bookingDetails['price']):
        response = JsonResponse({'error': 'Required parameters not met.'})
        response.status_code = 400
        return response
    booking = Booking()
    booking.user_id = bookingDetails['user_id']
    booking.property_id = bookingDetails['property_id']
    booking.startDate = bookingDetails['startDate']
    booking.endDate = bookingDetails['endDate']
    booking.price = bookingDetails['price']
    booking.num_guests = bookDetails['num_guests']
    # Save new booking 
    try:
        booking.save()
    except IntegrityError as ex:
        if (ex.__cause__.pgcode == '23505'):
            response = JsonResponse({'error': 'duplicate entry'})
            response.status_code = 400
            return response
    print("booking_id: " + str(booking.booking_id))
    response = JsonResponse({'booking_id':booking.booking_id}) # return booking id to test
    return response
@csrf_exempt
def BookingDetails(request, booking_id):
    # GET
    if (request.method == "GET"):
        debugLogger.debug("Get booking details")
        # Retrieve old booking
        try:
            booking = Booking.objects.all().filter(id=booking_id)
        except ObjectDoesNotExist:
            response = JsonResponse({'error': 'booking does not exist'})
            response.status_code = 403
            return response
            
        bookingDetails = {
            'booking_id': booking.booking_id,
            'user_id': booking.user_id,
            'property_id': booking.property_id,
            'startDate': booking.startDate,
            'endDate': booking.endDate,
            'bookingTime': booking.bookingTime,
            'price': booking.price,
            'num_guests':booking.num_guests,
        }
        return JsonResponse(bookingDetails)