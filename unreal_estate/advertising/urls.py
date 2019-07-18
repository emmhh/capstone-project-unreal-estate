from django.urls import path
from . import example
from . import propertyClass
# from . import property, 
#here redirect the url;
#notes: put frontend files to client/src/components/...js
#implement the calss as a seperate file called Advertising module;
urlpatterns = [
    path('example', example.exampleFunction),
    path('<int:property_id>', propertyClass.propertyFunction)
    '''
    9.	User can login and then view owned properties list page
    10.	User can list a property on owned properties page by clicking button and be redirected to property editing page 
    11.	User can view listing preview page after editing and confirm listing
    12.	Users can view their property details page from property list page 
    13.	Users can edit property from property details page 
    14.	Users can delete property from property details page 
    '''
    # path('property_listing', propertyClass.listing)
    # path('add_property', propertyClass.addProperty)
    # path('', )
    # path('', )
    # path(),
    # path(),
]
