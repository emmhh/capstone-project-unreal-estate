from django.shortcuts import render
from .models import Feature, Property, Rating, Reservation
from django.http import Http404

# Create your views here.
def property_list (request, user_id):
    # try:
    #     properties = Property.objects.get()
    pass