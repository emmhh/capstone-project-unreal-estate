from .models import Rating
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def RatingFunction (request, property_id):
    print(property_id)
    ratings = Rating.objects.filter(property_id=property_id).values()
    return JsonResponse({'results': list(ratings)})