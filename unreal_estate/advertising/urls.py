from django.urls import path
from . import example
from . import propertyClass
#here redirect the url;
#notes: put frontend files to client/src/components/...js
#implement the calls as a seperate file called Advertising module;
urlpatterns = [
    path('example', example.exampleFunction),
    path('<int:property_id>', propertyClass.PropertyFunction),
    path('user', propertyClass.list_property),
    path('new_property', propertyClass.addNew),
]
