from django.http import JsonResponse
from .models import Property
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.gis.geos import Point
import json
# import the logging library
import logging

def PropertyFunction (request, property_id):
    print(property_id)
    if (request.method == "GET"):
        # The table "Property"
        property_ob = Property.objects.get(property_id=property_id)
        propertyValues = {
            'property_id': property_ob.property_id,
            'address': property_ob.address,
            'latitude': property_ob.latitude,
            'longitude': property_ob.longitude,
            'num_rooms': property_ob.num_rooms,
            'num_bathrooms': property_ob.num_bathrooms,
            'num_guests': property_ob.num_guests,
            'num_beds': property_ob.num_beds,
            'description': property_ob.description,
            'space': property_ob.space,
            'name': property_ob.name,
            'features': property_ob.features,
            'building_type': property_ob.building_type,
            'price': property_ob.price,
            'avg_rating': property_ob.avg_rating,
            'images': property_ob.images,
            'owner_id': property_ob.owner_id
        }
        return JsonResponse(propertyValues)
    
    elif (request.methods == "POST"):
        propertyInfo = {
            'address': request.POST.get('suburb') + ", " + request.POST.get('city') + ", " + request.POST.get('post_code'),
            'latitude': request.POST.get('latitude'),
            'longitude': request.POST.get('longitude'),
            'num_rooms': request.POST.get('num_room'),
            'num_bathrooms': request.POST.get('num_bathroom'),
            'num_guests': request.POST.get('num_guests'),
            # missing num_beds
            'description': request.POST.get('description'),
            'space': request.POST.get('space'),
            'name': request.POST.get('name'),
            # could also add features
            'building_type':request.POST.get('building_type'),
            'price': request.POST.get('prices'),
            'avg_rating': request.POST.get('avg_rating'),
            'images': request.POST.get('image'),
            # also needs owner id?
        }
        if (not propertyInfo['address'] or not propertyInfo['latitude'] or not propertyInfo['longitude']
            or not propertyInfo['name'] ):
            propertyResponse = JsonResponse({'error': 'Required parameters not met.'})
            propertyResponse.status_code = 400
            return propertyResponse
        
        property_ob = Property()
        property_ob.property_id = Property.objects.latest('property_id').values().get('property_id') + 1
        property_ob.address = propertyInfo['address']
        property_ob.latitude = propertyInfo['latitude']
        property_ob.longitude = propertyInfo['longitude']
        property_ob.location = Point(propertyInfo['longitude'], propertyInfo['latitude'], srid=4326)
        property_ob.num_rooms = propertyInfo['num_rooms']
        property_ob.num_bathrooms = propertyInfo['num_bathrooms']
        property_ob.num_guests = propertyInfo['num_guests']
        property_ob.description = propertyInfo['description']
        property_ob.space = propertyInfo['space']
        property_ob.name = propertyInfo['name']
        property_ob.building_type = propertyInfo['building_type']
        property_ob.price = propertyInfo['price']
        property_ob.avg_rating = propertyInfo['avg_rating']
        if propertyInfo['images']:
            property_ob.images = propertyInfo['images']

        property_ob.save()

        propertyResponse = JsonResponse(property_ob)
        return propertyResponse

    #to delete the property from the data base.
    elif (request.methods == "DELETE"):
        property_id = request.GET.get('property_id')
        property_ob = Property.objects.get(pk=property_id)
        property_ob.delete()

        PropertyResponse = JsonResponse({'success': 'successfully deleted property'})
        return PropertyResponse



# INPUT: request, user_id
# OUTPUT: list of properties owned by the user.
def list_property (request, user_id):
    #GET
    if (request.method == "GET"):
        # The table "Property"
        property_set = User.objects.filter(id=user_id)
        property_list = []
        for ppt in property_set:
            response = {
                'suburb': ppt.suburb,
                'city': ppt.city,
                'latitude': ppt.latitude,
                'longitude': ppt.longitude,
                'post_code': ppt.post_code,
                'num_bathroom': ppt.num_bathroom,
                'num_guests': ppt.num_guests,
                'description': ppt.description,
                'space': ppt.space,
                'name': ppt.name,
                'prices': ppt.prices,
                'avg_rating': ppt.avg_rating,
                'image': ppt.image,
            }
            property_list.append(response)

        return JsonResponse(property_list)

    response = JsonResponse({'Error': 'no property returned from advertising.propertyClass.list_property'})
    return response