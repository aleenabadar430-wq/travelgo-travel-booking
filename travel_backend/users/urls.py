from django.urls import path
from .views import RegisterView, AnalyticsDashboardView, ActivityLogListView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("analytics/", AnalyticsDashboardView.as_view(), name="analytics"),
    path("logs/", ActivityLogListView.as_view(), name="logs"),
]




