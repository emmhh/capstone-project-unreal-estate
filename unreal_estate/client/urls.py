from django.urls import path
from . import views
print("it came in views");
urlpatterns = [
    path('', views.index ),
]
