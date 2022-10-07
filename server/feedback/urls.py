from .views import FilterFeedback, GetCountForEachRating, form, GetRatingCount, GetTotalCountDistrictSubdivision, GetTotalFeedbackCount
from django.urls import path

urlpatterns = [
    path("form/", form.as_view(), name="Feedback Form"),
    path("filter/", FilterFeedback.as_view(), name="Feedback Form"),
    path("rating-count/", GetRatingCount.as_view(), name="Rating Count"),
    path("count/", GetTotalFeedbackCount.as_view(), name="Feedback Count"),
    path("sub-count/", GetTotalCountDistrictSubdivision.as_view(), name="Subdivision Count"),
    path("rating-full/", GetCountForEachRating.as_view(), name="Total Count")
]