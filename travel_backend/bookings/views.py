from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer,BookingStatusSerializer
from destinations.permissions import IsAdminRole


class AdminBookingsListView(generics.ListAPIView):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsAdminRole]


class BookingListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/bookings/  → list the current user's bookings
    POST /api/bookings/  → create a new booking
    """
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


from users.models import ActivityLog

class UpdateBookingStatusView(generics.UpdateAPIView):
    serializer_class = BookingStatusSerializer
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get_queryset(self):
        return Booking.objects.all() 

    def perform_update(self, serializer):
        booking = serializer.save()
        
        ActivityLog.objects.create(
            user=self.request.user,
            action=f"Updated booking #{booking.id} status to {booking.status}"
        )

class DeleteBookingView(generics.DestroyAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)