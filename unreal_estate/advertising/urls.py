<<<<<<< HEAD
from django.urls import path
from . import example
from . import propertyClass
#here redirect the url;
#notes: put frontend files to client/src/components/...js
#implement the calls as a seperate file called Advertising module;
urlpatterns = [
    path('example', example.exampleFunction),
    path('<int:property_id>', propertyClass.PropertyFunction),
    path('reviews/<int:property_id>', propertyClass.RatingFunction),
    path('user', propertyClass.list_property),
    path('new_property', propertyClass.addNew),
    path('test_upload', propertyClass.testImageUpload)
]
=======
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
    path('test_upload', propertyClass.testImageUpload)
]
>>>>>>> b2e38a6142709814340c86b495e8cffe53331925
