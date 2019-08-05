from django.urls import path
from . import reviews
# from . import views

urlpatterns = [
    path('', reviews.SubmitReview),
    path('getReview/<int:booking_id>', reviews.ReviewDetailsBID),
    path('<int:property_id>', reviews.GetRatingsByPropertyId),
    path('classifications/<int:property_id>', reviews.GetRatingsByPropertyIdWithClassifications),
    path('update/<int:property_id>', reviews.UpdateRatingsWithClassifications),
]
