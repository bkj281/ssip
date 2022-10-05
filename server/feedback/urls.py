from .views import FilterFeedback, form
from django.urls import path

urlpatterns = [
    path("form/", form.as_view(), name="Feedback Form"),
    # path("filter/", FilterFeedback.as_view(), name="Feedback Form"),
    #path("filter/", TempFilter.as_view({'get': 'list'}), name="Feedback Form"),
    path("filter/", FilterFeedback.as_view(), name="Feedback Form"),


]