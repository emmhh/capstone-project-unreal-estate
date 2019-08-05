import googlemaps
from django.http import JsonResponse
from django.core import serializers
from .models import Property
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.gis.geos import Point
import json
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Max
from django.http.multipartparser import MultiPartParser
# import the logging library
import logging

gmaps = googlemaps.Client(key='AIzaSyClDGqfGMbApqkFQ3SZbxG6dv7h7FDPCcA')

@csrf_exempt
def PropertyFunction (request, property_id):
    print(property_id)
    if (request.method == "GET"):
        # The table "Property"
        try:
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
            response = JsonResponse(propertyValues)
            response.status_code = 200
            return response
        except Property.DoesNotExist:
            response = JsonResponse({'Error': 'no property returned from advertising.propertyClass.list_property'})
            response.status_code = 404
            return response

    # Add new property
    elif (request.method == "POST"):
        json_data = json.loads(request.body.decode('utf-8'))
        propertyInfo = {
            'address': json_data['propertyInfo']['address'],
            'latitude': json_data['propertyInfo']['latitude'],
            'longitude': json_data['propertyInfo']['longitude'],
            'num_rooms': json_data['propertyInfo']['num_rooms'],
            'num_bathrooms': json_data['propertyInfo']['num_bathrooms'],
            'num_guests': json_data['propertyInfo']['num_guests'],
            'num_beds': json_data['propertyInfo']['num_beds'],
            'description': json_data['propertyInfo']['description'],
            'space': json_data['propertyInfo']['space'],
            'name': json_data['propertyInfo']['name'],
            'building_type': json_data['propertyInfo']['building_type'],
            'price': json_data['propertyInfo']['price'],
            'avg_rating': json_data['propertyInfo']['avg_rating'],
            'images': json_data['propertyInfo']['images'],
            'owner_id': json_data['propertyInfo']['owner_id'],
        }
        print(propertyInfo['price'])
        if (not propertyInfo['price']
            or not propertyInfo['address']
            or not propertyInfo['building_type']
            ):
            propertyResponse = JsonResponse({'error': 'Required parameters not met.!!'})
            propertyResponse.status_code = 400
            return propertyResponse

        property_ob = Property()

        property_ob.address = propertyInfo['address']
        property_ob.latitude = getlat(propertyInfo['address'])
        property_ob.longitude = getlng(propertyInfo['address'])
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
        property_ob_serialized = serializers.serialize('json', property_ob)
        propertyResponse = JsonResponse(property_ob_serialized, safe=False)
        return propertyResponse
    # UPDATE PROPERTY
    elif (request.method == "PUT"):
        print(request.headers.get('Content-Type'))
        json_data = json.loads(request.body)
        propertyInfo = {
            'property_id': property_id,
            'address': json_data['propertyInfo']['address'],
            'latitude': json_data['propertyInfo']['latitude'],
            'longitude': json_data['propertyInfo']['longitude'],
            'num_rooms': json_data['propertyInfo']['num_rooms'],
            'num_bathrooms': json_data['propertyInfo']['num_bathrooms'],
            'num_guests': json_data['propertyInfo']['num_guests'],
            'num_beds': json_data['propertyInfo']['num_beds'],
            'description': json_data['propertyInfo']['description'],
            'space': json_data['propertyInfo']['space'],
            'name': json_data['propertyInfo']['name'],
            'building_type': json_data['propertyInfo']['building_type'],
            'price': json_data['propertyInfo']['price'],
            'avg_rating': json_data['propertyInfo']['avg_rating'],
            'images': json_data['propertyInfo']['images'],
            'owner_id': json_data['propertyInfo']['owner_id'],
        }
        print(propertyInfo['price'])
        # Basic attributes that shouldn't be missing
        if (not propertyInfo['price']
            or not propertyInfo['address']
            or not propertyInfo['building_type']
            ):
            propertyResponse = JsonResponse({'error': 'Required parameters not met.!!'})
            propertyResponse.status_code = 400
            return propertyResponse
        user = request.user
        if not (request.user.is_authenticated):
            propertyResponse = JsonResponse({'error': 'User not logged in.'})
            propertyResponse.status_code = 403
            return propertyResponse
        property_ob = Property.objects.get(property_id=property_id)
        property_ob.property_id = property_id
        property_ob.owner_id = user.id
        #updates the user.is_property_owner and save.
        user.is_property_owner = True
        user.save()
        property_ob.address = propertyInfo['address']
        property_ob.latitude = getlat(propertyInfo['address'])
        property_ob.longitude = getlng(propertyInfo['address'])
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

        propertyResponse = JsonResponse(propertyInfo)
        propertyResponse.status_code = 201
        return propertyResponse
    #to delete the property from the data base.
    elif (request.method == "DELETE"):
        print("property_id received in DELETE request is" + str(property_id))
        # property_id = request.GET.get('property_id')
        property_ob = Property.objects.get(property_id=property_id)
        try:
            property_ob.delete()
        except Property.DoesNotExist:
            PropertyResponse = JsonResponse({'err': 'Property Doesnot exist'})
            PropertyResponse.status_code = 404
            return PropertyResponse


        PropertyResponse = JsonResponse({'success': 'successfully deleted property'})
        return PropertyResponse



# INPUT: request, user_id
# OUTPUT: list of properties owned by the user.
@csrf_exempt
def list_property (request):
    #GET
    user = request.user
    if (request.method == "GET"):
        # The table "Property"
        # property_set = Property.objects.filter(id=user_id)
        property_set = Property.objects.filter(owner_id=user.id)
        property_list = []
        for ppt in property_set:
            response = {
                'prop_id': ppt.property_id,
                'address': ppt.address,
                'latitude': ppt.latitude,
                'longitude': ppt.longitude,
                'num_rooms': ppt.num_rooms,
                'num_bathrooms': ppt.num_bathrooms,
                'num_guests': ppt.num_guests,
                'description': ppt.description,
                'building_type': ppt.building_type,
                'space': ppt.space,
                'name': ppt.name,
                'price': ppt.price,
                'avg_rating': ppt.avg_rating,
                'images': ppt.images,
            }
            property_list.append(response)
        response = JsonResponse(property_list, safe=False)
        response.status_code = 200
        return response
    #FIXME: serilise
    response = JsonResponse({'Error': 'no property returned from advertising.propertyClass.list_property'})
    response.status_code=404
    return response

@csrf_exempt
def addNew (request):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        propertyInfo = {
            'address': json_data['propertyInfo']['address'],
            'latitude': json_data['propertyInfo']['latitude'],
            'longitude': json_data['propertyInfo']['longitude'],
            'num_rooms': json_data['propertyInfo']['num_rooms'],
            'num_bathrooms': json_data['propertyInfo']['num_bathrooms'],
            'num_guests': json_data['propertyInfo']['num_guests'],
            'num_beds': json_data['propertyInfo']['num_beds'],
            'description': json_data['propertyInfo']['description'],
            'space': json_data['propertyInfo']['space'],
            'name': json_data['propertyInfo']['name'],
            'building_type': json_data['propertyInfo']['building_type'],
            'price': json_data['propertyInfo']['price'],
            'avg_rating': json_data['propertyInfo']['avg_rating'],
            'images': json_data['propertyInfo']['images'],
            'owner_id': json_data['propertyInfo']['owner_id'],
        }
        print(propertyInfo['price'])
        if (not propertyInfo['price']
            or not propertyInfo['address']
            or not propertyInfo['building_type']
            ):
            propertyResponse = JsonResponse({'error': 'Required parameters not met.!!'})
            propertyResponse.status_code = 400
            return propertyResponse

        property_ob = Property()
        prop_id = Property.objects.all().aggregate(Max('property_id'))
        print("max prop_id is: ")
        print(prop_id['property_id__max'])
        property_ob.property_id = prop_id['property_id__max'] + 1
        print("new property_id is: ")
        print(property_ob.property_id)
        property_ob.address = propertyInfo['address']
        property_ob.latitude = getlat(propertyInfo['address'])
        property_ob.longitude = getlng(propertyInfo['address'])
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
        user = request.user
        #updates the user.is_property_owner and save.
        user.is_property_owner = True
        user.save()
        if (not propertyInfo['owner_id']):
            property_ob.owner_id = user.id
        else :
            property_ob.owner_id = propertyInfo['owner_id']

        property_ob.save()
        property_ob_serialized = serializers.serialize('json', [property_ob,])
        propertyResponse = JsonResponse(property_ob_serialized, safe=False)
        # propertyResponse = JsonResponse(property_ob, safe=False)
        return propertyResponse

@csrf_exempt
def testImageUpload(request):
    print('it came in testImageUpload')
    # print(request)
    print(request.headers)
    print("********\n \n")
    # parser = MultiPartParser(
    #     request.META, request.body, request.upload_handlers)
    # POST, FILES = parser.parse()
    # print(FILES)
    # print(json.loads(request.body))
    print(request.FILES['0'])

def getlat (address):
    geocode_result = gmaps.geocode(address)
    lat = geocode_result[0]["geometry"]["location"]["lat"]
    return lat
def getlng (address):
    geocode_result = gmaps.geocode(address)
    lng = geocode_result[0]["geometry"]["location"]["lng"]
    return lng
