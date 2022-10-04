from django.urls import path, include, re_path
from .views import AddStation

urlpatterns = [
    re_path('add/', AddStation.as_view()),
]