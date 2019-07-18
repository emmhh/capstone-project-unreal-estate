from django.urls import path
from . import example
from . import propertyClass
# from . import property, 
#here redirect the url;
#notes: put frontend files to client/src/components/...js
#implement the calss as a seperate file called Advertising module;
urlpatterns = [
    path('example', example.exampleFunction),
    path('<int:property_id>', propertyClass.propertyFunction),
    path('<int:user_id>', propertyClass.list_property),
]
