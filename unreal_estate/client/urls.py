from django.conf.urls import url
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index ),
    # url(r'^$', views.index),
    path('AdModule', views.index),
    path('AdPreview', views.index),
    path('image', views.index),
    # path('AdForm/<property_id>', views.index),
    url(r'^AdForm/\w+/$', views.index),
    path('signup', views.index),
    path('login', views.index),
    path('profile', views.index),
    path('mybookings', views.index),
    # path('property/<property_id>', views.index),
    url(r'^property/\w+/$', views.index),
    # path('property_booking/<property_id>', views.index),
    url(r'^property_booking/\w+/$', views.index),
    url(r'^AdReservations/\w+/$', views.index),
    # path('confirmation/<booking_id>', views.index),
    url(r'^confirmation/\w+/$', views.index),
    path('results', views.index),
]
