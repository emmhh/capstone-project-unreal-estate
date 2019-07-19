from django.http import JsonResponse
import json
import datetime
from .models import PropertyManager
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def handleRequests(request):
	print("recieved request")
	print(request.body.decode('utf-8'))
	requestObj = json.loads(request.body.decode('utf-8'))
	address = requestObj['address']
	checkin = requestObj['checkin'].split("(")
	checkin = checkin[0]
	checkout = requestObj['checkout'].split("(")
	checkout = checkout[0]
	checkin = datetime.datetime.strptime(checkin, "%a %b %d %Y %H:%M:%S GMT%z ")
	checkout = datetime.datetime.strptime(checkout, "%a %b %d %Y %H:%M:%S GMT%z ")
	numGuests = requestObj['numGuests']
	properties = PropertyManager.primarySearch(address, checkin, checkout, numGuests)
	return JsonResponse({'results': list(properties)})