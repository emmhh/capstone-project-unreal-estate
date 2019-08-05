from django.urls import path
from . import reviews
# from . import views

urlpatterns = [
    path('<int:property_id>', reviews.GetRatingsByPropertyId),
    path('classifications/<int:property_id>', reviews.GetRatingsByPropertyIdWithClassifications),
    path('update/<int:property_id>', reviews.UpdateRatingsWithClassifications),
]
