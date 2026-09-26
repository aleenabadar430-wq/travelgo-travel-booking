from django.urls import path
from .views import *

urlpatterns = [
    path("", DestinationListView.as_view()),
    path("create/", DestinationCreateView.as_view()),
    path("<int:pk>/", DestinationUpdateDeleteView.as_view()),
]