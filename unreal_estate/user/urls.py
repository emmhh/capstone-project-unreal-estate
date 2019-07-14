from django.urls import path
from . import user

urlpatterns = [
    path('', user.user ),
    path('login', user.loginReq ),
    path('testlogin', user.testLogin),
]
