from django.urls import path
from . import views

urlpatterns = [
    path('', views.index ),
    path('AdModule', views.index),
    path('AdPreview', views.index),
    path('AdForm/<property_id>', views.index),
    path('signup', views.index),
    path('login', views.index),
    path('profile', views.index),
    path('mybookings', views.index),
    path('property/<property_id>', views.index),
    path('property_booking/<property_id>', views.index),
    path('confirmation/<booking_id>', views.index),
    path('results', views.index),
]
