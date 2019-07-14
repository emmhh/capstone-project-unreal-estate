from django.http import JsonResponse
from .models import User
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

def user(request):

  # GET
  if (request.method == "GET"):
    debugLogger.debug("Get user details")
    testResponce = {
      'test': 'test object'
    }
    return JsonResponse(testResponce)

  # POST
  elif (request.method == "POST"):
    debugLogger.debug("Create new user")
    userDetails = {
      'first_name': request.POST.get('firstName'),
      'last_name': request.POST.get('lastName'),
      'phone': request.POST.get('phone'),
      'password': request.POST.get('password'),
      'email': request.POST.get('email'),
      'username': request.POST.get('email'),
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
    responce = JsonResponse(userDetails)
    return responce

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
    print('passwoed is {}'.format(password))
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
    
def testLogin(request):

  # GET
  if (request.method == "GET"):
    debugLogger.debug("***********")
    debugLogger.debug("Login user")
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