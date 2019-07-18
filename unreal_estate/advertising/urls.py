from django.urls import path
from . import example
from . import propertyClass
# from . import property, 
#here redirect the url;
#notes: put frontend files to client/src/components/...js
#implement the calss as a seperate file called Advertising module;
urlpatterns = [
    path('example', example.exampleFunction),
    path('<int:property_id>', propertyClass.PropertyFunction)
    
    # path('property_list', property.list),
    # path(),
    # path(),
]
