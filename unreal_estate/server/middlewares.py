from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from user.models import User
import jwt
class MyMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        self.process_request(request)
        response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = "*"
        response['Access-Control-Allow-Credentials'] = True
        response['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept'
        print(f"token is {request.META.get('HTTP_AUTHORIZATION')}")
    #   token = request.META.get('HTTP_AUTHORIZATION')
    #   if (token and not request.user.is_authenticated):
    #         # try:
    #             payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    #             print(payload)
    #             login(request, User.objects.get(
    #                 username=payload["username"], password=payload["password"]))
        return response


    def process_request(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)
        if (token):
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                print(payload)
                login(request, User.objects.get(
                    username=payload["username"], password=payload["password"]))
            except:
                print("There was an error.")
        return
