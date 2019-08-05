# from django.http import JsonResponse
# from .models import Review
# from django.db.utils import IntegrityError
# from django.core.exceptions import ObjectDoesNotExist
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.decorators import login_required
# import json
# from django.views.decorators.csrf import csrf_exempt
# import logging

# # Get an instance of a logger
# debugLogger = logging.getLogger('debugLogger')
# logger = logging.getLogger(__name__)
# @csrf_exempt
# def SubmitReview(request):

#     # POST
#     if (request.method == "POST"):
#         debugLogger.debug("Create new review")
#         if not (request.user.is_authenticated):
#             debugLogger.info("the user is not logged in")
#             responce = JsonResponse({'error': "User is not logged in."})
#             responce.status_code = 403
#             return responce
#         # print("post: " + request.body.decode('utf-8'))
#         # print("user: " + str(request.user.id))
#         json_data = json.loads(request.body.decode('utf-8'))
#         reviewDetails = {
#             'user_id': request.user.id,
#             # 'user_id': json_data['user_id'],
#             'property_id': json_data['property_id'],
#             'startDate':  json_data['startDate'],
#             'endDate':  json_data['endDate'],
#             'price': json_data['total_price'],
#             'num_guests' :json_data['guests']
#         }

#     # Data Validation
#     if not (
#         reviewDetails['user_id'] and \
#         reviewDetails['property_id'] and \
#         reviewDetails['startDate'] and \
#         reviewDetails['endDate'] and \
#         reviewDetails['num_guests'] and \
#         reviewDetails['price']):
#         response = JsonResponse({'error': 'Required parameters not met.'})
#         response.status_code = 400
#         return response
#     review = Review()
#     review.property_id = reviewDetails['property_id']
#     review.user_id = reviewDetails['user_id']
#     review.startDate = reviewDetails['startDate']
#     review.endDate = reviewDetails['endDate']
#     review.price = reviewDetails['price']
#     review.num_guests = reviewDetails['num_guests']
#     # Save new booking 
#     try:
#         booking.save()
#     except IntegrityError as ex:
#         if (ex.__cause__.pgcode == '23505'):
#             response = JsonResponse({'error': 'duplicate entry'})
#             response.status_code = 400
#             return response
#     # print("booking_id: " + str(booking.booking_id))
#     response = JsonResponse({'booking_id':booking.booking_id}) # return booking id to test
#     return response
# @csrf_exempt
# def ReviewDetailsBID(request, booking_id):
#     # GET
#     if (request.method == "GET"):
#         debugLogger.debug("Get booking details BID")
#         # Retrieve old booking
#         try:
#             review = Rating.objects.get(booking_id=booking_id)
#         except ObjectDoesNotExist:
#             response = JsonResponse({'error': 'booking does not exist'})
#             response.status_code = 403
#             return response
            
#         # print(booking.user_id, booking.property_id, booking.startDate, booking.endDate, booking.bookingTime, booking.price, booking.num_guests)
#         reviewDetails = {
#             'user_id': review.user_id,
#             'property_id': review.property_id,
#             'startDate': review.startDate,
#             'endDate': review.endDate,
#             'reviewTime': review.reviewTime,
#             'price': review.price,
#             'num_guests':review.num_guests,
#         }
#         return JsonResponse(bookingDetails)