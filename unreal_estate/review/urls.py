from django.urls import path
from . import reviews
# from . import views

urlpatterns = [
    path('<int:property_id>', reviews.RatingFunction),
    path('', reviews.SubmitReview),
    path('getReview/<int:booking_id>', reviews.ReviewDetailsBID),
]
