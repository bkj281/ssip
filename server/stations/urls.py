from django.urls import path, include, re_path
<<<<<<< HEAD
from .views import AddStation, GetStationNameById, GetAllSubdivisions, GetAllDistrict
=======
from .views import AddStation, GetAllDistrict, GetAllSubdivisions, GetStationNameById
>>>>>>> 9eb0135a1809d0d9397424f0f96c94b219cb4411

urlpatterns = [
    re_path('add/', AddStation.as_view()),
    re_path('get/', GetStationNameById.as_view()),
    re_path('districts/get', GetAllDistrict.as_view()),
    re_path('sub-division/get', GetAllSubdivisions.as_view()),
<<<<<<< HEAD
=======


>>>>>>> 9eb0135a1809d0d9397424f0f96c94b219cb4411
]