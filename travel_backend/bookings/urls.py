from django.urls import path
from .views import BookingListCreateView, UpdateBookingStatusView, DeleteBookingView, AdminBookingsListView

urlpatterns = [
    path("all/", AdminBookingsListView.as_view()),
    path("", BookingListCreateView.as_view()),                    # GET + POST /api/bookings/
    path("<int:pk>/update-status/", UpdateBookingStatusView.as_view()),
    path("<int:pk>/delete/", DeleteBookingView.as_view()),
]