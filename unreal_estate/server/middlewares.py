from django.conf import settings

class MyMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = settings.LOCAL_FRONTEND_HEADER
        response['Access-Control-Allow-Credentials'] = True
        return response