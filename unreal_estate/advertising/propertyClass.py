from django.http import JsonResponse
from .models import PropertyCliveTest
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json
# import the logging library
import logging

def PropertyFunction (request, property_id):
    print(property_id)
    if (request.method == "GET"):
        # The table "Property"
        property_ob = PropertyCliveTest.objects.get(id=property_id)
        response = {
            'suburb': property_ob.suburb,
            'city': property_ob.city,
            'latitude': property_ob.latitude,
            'longitude': property_ob.longitude,
            'post_code': property_ob.post_code,
            'num_bathroom': property_ob.num_bathroom,
            'num_guests': property_ob.num_guests,
            'description': property_ob.description,
            'space': property_ob.space,
            'name': property_ob.name,
            'prices': property_ob.prices,
            'avg_rating': property_ob.avg_rating,
            'image': property_ob.image,
        }
        return JsonResponse(response)
    
    elif (request.methods == "POST"):
        propertyInfo = {
            'suburb': request.POST.get('suburb'),
            'city': request.POST.get('city'),
            'latitude': request.POST.get('latitude'),
            'longitude': request.POST.get('longitude'),
            'post_code': request.POST.get('post_code'),
            'num_room': request.POST.get('num_room'),
            'num_bathroom': request.POST.get('num_bathroom'),
            'num_guests': request.POST.get('num_guests'),
            'description': request.POST.get('description'),
            'space': request.POST.get('space'),
            'name': request.POST.get('name'),
            'building_type':request.POST.get('building_type'),
            'prices': request.POST.get('prices'),
            'avg_Rating': request.POST.get('avg_Rating'),
            'images': request.POST.get('images'),
        }
        if (not propertyInfo['address'] or not propertyInfo['avg_Rating']
            or not propertyInfo['num_Guests'] or not propertyInfo['description']
            or not propertyInfo['name'] or not propertyInfo['building_type']
            or not propertyInfo['prices']):
            response = JsonResponse({'error': 'Required parameters not met.'})
            response.status_code = 400
            return response
        
        property_ob = PropertyCliveTest()
        property_ob.suburb = propertyInfo['suburb']
        property_ob.city = propertyInfo['city']
        property_ob.latitude = propertyInfo['latitude']
        property_ob.longitude = propertyInfo['longitude']
        property_ob.post_code = propertyInfo['post_code']
        property_ob.num_room = propertyInfo['num_room']
        property_ob.num_bathroom = propertyInfo['num_bathroom']
        property_ob.num_guests = propertyInfo['num_guests']
        property_ob.description = propertyInfo['description']
        property_ob.space = propertyInfo['space']
        property_ob.name = propertyInfo['name']
        property_ob.building_type = propertyInfo['building_type']
        property_ob.prices = propertyInfo['prices']
        property_ob.avg_Rating = propertyInfo['avg_Rating']
        property_ob.images = propertyInfo['images']

        property_ob.save()

        response = JsonResponse(property_ob)
        return response

    #to delete the property from the data base.
    elif (request.methods == "DELETE"):
        property_id = request.GET.get('property_id')
        property_ob = PropertyCliveTest.objects.get(pk=property_id)
        property_ob.delete()

        response = JsonResponse({'success': 'successfully deleted property'})
        return response



def property_list (request, user_id):
    pass