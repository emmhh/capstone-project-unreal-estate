from django.urls import path
from . import example
#here redirect the url;
#notes: put frontend files to client/src/components/...js
#implement the calss as a seperate file called Advertising module;
urlpatterns = [
    path('example', example.exampleFunction),
]
