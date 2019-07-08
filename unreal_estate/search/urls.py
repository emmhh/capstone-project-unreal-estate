from django.urls import path
from . import models 

urlpatterns = [
	path('post', models.handleRequests),
]
