from .views import FilterFeedback, GetRatingCount, form
from django.urls import path

urlpatterns = [
    path("form/", form.as_view(), name="Feedback Form"),
    path("filter/", FilterFeedback.as_view(), name="Feedback Form"),
    path("rating/count/", GetRatingCount.as_view(), name="Feedback Form"),

]