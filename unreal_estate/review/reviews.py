from .models import Rating
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../ml/')))
from runner import classify_batch


@csrf_exempt
def GetRatingsByPropertyId (request, property_id):
	print(property_id)
	print(sys.path)
	ratings = Rating.objects.filter(property_id=property_id).values()
	return JsonResponse({'results': list(ratings)})

@csrf_exempt
def GetRatingsByPropertyIdWithClassifications (request, property_id):
	print(property_id)
	ratings = Rating.objects.filter(property_id=property_id).values()
	texts = [r['notes'] for r in ratings]
	if len(texts) > 0:
		classifications = classify_batch(texts)
		for i in range(len(ratings)):
			ratings[i]['ai_rating'] = classifications[i]
	return JsonResponse({'results': list(ratings)})

@csrf_exempt
def UpdateRatingsWithClassifications (request, property_id):
	print(property_id)
	ratings = Rating.objects.filter(property_id=property_id)
	texts = [r.notes for r in ratings]
	if len(texts) > 0:
		classifications = classify_batch(texts)
		for i in range(len(ratings)):
			ratings[i].value = classifications[i]
			ratings[i].save()
	
	ratings = ratings.values()
	
	if len(texts) > 0:
		for i in range(len(ratings)):
			ratings[i]['ai_rating'] = classifications[i]

	return JsonResponse({'results': list(ratings)})
