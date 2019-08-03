from django.urls import path
from . import search

urlpatterns = [
    path('post', search.handleRequests )
]