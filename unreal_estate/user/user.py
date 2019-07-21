from django.http import JsonResponse
from .models import User
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
def user(request):

  # GET
  if (request.method == "GET"):
    debugLogger.debug("Get user details")

    if not (request.user.is_authenticated):
      responce = JsonResponse({'error': 'User is not logged in.'})
      responce.status_code = 400
      return responce
    else:
      user = request.user
      userDetails = {
        'firstName': user.first_name,
        'lastName': user.last_name,
        'phone': user.phone,
        'gender': user.gender,
        'email': user.email,
      }
      return JsonResponse(userDetails)

  # POST
  elif (request.method == "POST"):
    debugLogger.debug("Create new user")
    json_data = json.loads(request.body)
    userDetails = {
      'first_name': json_data['userDetails']['firstName'],
      'last_name': json_data['userDetails']['lastName'],
      'phone': json_data['userDetails']['phone'],
      'password': json_data['userDetails']['password'],
      'email': json_data['userDetails']['email'],
      'username': json_data['userDetails']['email'],
      'gender': json_data['userDetails']['gender'],
    }
    debugLogger.debug(userDetails)

    # Data Validation
    if not (userDetails['first_name'] and \
      userDetails['last_name'] and \
      userDetails['password'] and \
      userDetails['email']):
      responce = JsonResponse({'error': 'Required parameters not met.'})
      responce.status_code = 400
      return responce
    user = User()
    user.username = userDetails['username']
    user.password = userDetails['password']
    user.first_name = userDetails['first_name']
    user.last_name = userDetails['last_name']
    user.phone = userDetails['phone']
    user.email = userDetails['email']
    user.gender = userDetails['gender']
    
    # Save new user 
    try:
      user.save()
    except IntegrityError as ex:
      if (ex.__cause__.pgcode == '23505'):
        responce = JsonResponse({'error': 'Email already exists.'})
        responce.status_code = 400
        return responce
    del userDetails['password']
    del userDetails['username']
    responce = JsonResponse({'msg': '{} signed up successfully'.format(userDetails['first_name'])})
    responce.status_code = 201
    return responce


  # PUT
  elif (request.method == "PUT"):
    debugLogger.debug("Update user details")
    json_data = json.loads(request.body)
    userDetails = {
      'first_name': json_data['userDetails']['firstName'],
      'last_name': json_data['userDetails']['lastName'],
      'phone': json_data['userDetails']['phone'],
      'email': json_data['userDetails']['email'],
      'username': json_data['userDetails']['email'],
      'gender': json_data['userDetails']['gender'],
    }
    debugLogger.debug(userDetails)

    # Data Validation
    if not (userDetails['first_name'] and \
      userDetails['last_name'] and \
      userDetails['email']):
      responce = JsonResponse({'error': 'Required parameters not met.'})
      responce.status_code = 400
      return responce
    user = User.objects.get(username=userDetails['email'])
    if (user != request.user):
      responce = JsonResponse({'error': 'Forbidden.'})
      responce.status_code = 403
      return responce
    user.username = userDetails['username']
    user.first_name = userDetails['first_name']
    user.last_name = userDetails['last_name']
    user.phone = userDetails['phone']
    user.email = userDetails['email']
    user.gender = userDetails['gender']
    
    # Save new user 
    try:
      user.save()
    except IntegrityError as ex:
      if (ex.__cause__.pgcode == '23505'):
        responce = JsonResponse({'error': 'Email already exists.'})
        responce.status_code = 400
        return responce
    responce = JsonResponse({'msg': 'Profile updated successfully'})
    responce.status_code = 200
    return responce
@csrf_exempt
def loginReq(request):

  # POST
  if (request.method == "POST"):
    
    debugLogger.debug("***********")
    debugLogger.debug("Login user")
    debugLogger.debug("***********")
    json_data = json.loads(request.body)
    try:
      password = json_data['password']
      email = json_data['email']
    except KeyError:
      responce = JsonResponse({'error': 'Required parameters not met.'})
      responce.status_code = 400
      return responce
    print()
    print('email is {}'.format(email))
    print('password is {}'.format(password))
    print()
    # Data Validation
    if not (email and password):
      responce = JsonResponse({'error': 'Required parameters not met.'})
      responce.status_code = 400
      return responce
    
    # Authenticate user
    try:
      user = User.objects.get(username=email, password=password)
    except ObjectDoesNotExist:
      responce = JsonResponse({'error': 'Either email and password don\'t match'})
      responce.status_code = 403
      return responce

    debugLogger.info("User is {}".format(user))
    if user is not None:
      login(request, user)

    responce = JsonResponse({'msg': 'Successfully logged in'})
    return responce
@csrf_exempt
def logoutReq(request):
  debugLogger.debug("***********")
  debugLogger.debug("Logout user")
  debugLogger.debug("***********")
  if (request.user.is_authenticated):
    logout(request)
  responce = JsonResponse({
        'msg': 'User logged out successfully.',
        'user_logged_in' : False,
  })
  return responce
@csrf_exempt    
def testLogin(request):

  # GET
  if (request.method == "GET"):
    debugLogger.debug("***********")
    debugLogger.debug("Test Login")
    debugLogger.debug("***********")
    if not (request.user.is_authenticated):
      responce = JsonResponse({
        'msg': 'User is not logged in.',
        'user_logged_in' : False,
      })
      return responce  
    else:
      responce = JsonResponse({
        'msg': 'User is logged in.',
        'user_logged_in' : True,
      })
      return responce