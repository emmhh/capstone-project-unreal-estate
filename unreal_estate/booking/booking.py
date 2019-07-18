from django.http import JsonResponse
from .models import Booking
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json
# import the logging library
import logging

# Get an instance of a logger
debugLogger = logging.getLogger('debugLogger')
logger = logging.getLogger(__name__)

def Booking_function(request):

  # GET
    if (request.method == "GET"):
        debugLogger.debug("Get booking details")
        # Retrieve old booking
        try:
            booking = Booking.objects.all().filter(id=request.GET.get(request.booking_id))
        except ObjectDoesNotExist:
            response = JsonResponse({'error': 'booking does not exist'})
            response.status_code = 403
            return response
            
        bookingDetails = {
            'booking_id': booking.booking_id,
            'user_id': booking.user_id,
            'owner_id': booking.owner_id,
            'property_id': booking.property_id,
            'startDate': booking.startDate,
            'endDate': booking.endDate,
            'bookingTime': booking.bookingTime,
            'price': booking.price,
        }
        return JsonResponse(bookingDetails)

    # POST
    elif (request.method == "POST"):
        debugLogger.debug("Create new booking")
        bookingDetails = {
            'user_id': request.POST.get('user_id'),
            'owner_id': request.POST.get('owner_id'),
            'property_id': request.POST.get('property_id'),
            'startDate': request.POST.get('startDate'),
            'endDate': request.POST.get('endDate'),
            'bookingTime': request.POST.get('bookingTime'),
            'price': request.POST.get('price'),
        }
        debugLogger.debug(bookingDetails)

    # Data Validation
    if not (
        bookingDetails['user_id'] and \
        bookingDetails['owner_id'] and \
        bookingDetails['property_id'] and \
        bookingDetails['startDate'] and \
        bookingDetails['endDate'] and \
        bookingDetails['bookingTime'] and \
        bookingDetails['price']):
        response = JsonResponse({'error': 'Required parameters not met.'})
        response.status_code = 400
        return response
    booking = Booking()
    booking.user_id = bookingDetails['user_id']
    booking.owner_id = bookingDetails['owner_id']
    booking.property_id = bookingDetails['property_id']
    booking.startDate = bookingDetails['startDate']
    booking.endDate = bookingDetails['endDate']
    booking.bookingTime = bookingDetails['bookingTime']
    booking.price = bookingDetails['price']

    # Save new user 
    try:
        booking.save()
    except IntegrityError as ex:
        if (ex.__cause__.pgcode == '23505'):
            response = JsonResponse({'error': 'Email already exists.'})
            response.status_code = 400
            return response
    response = JsonResponse(bookingDetails)
    return response