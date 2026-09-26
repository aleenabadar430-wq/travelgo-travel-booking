from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Sum, F
from .serializers import RegisterSerializer
from .models import ActivityLog
from bookings.models import Booking
from destinations.permissions import IsAdminRole
from destinations.models import Destination

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]   


class ActivityLogSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = ActivityLog
        fields = ['id', 'username', 'action', 'timestamp']

class ActivityLogListView(generics.ListAPIView):
    queryset = ActivityLog.objects.all().order_by('-timestamp')
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated, IsAdminRole]


class AnalyticsDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        total_destinations = Destination.objects.count()
        total_users = User.objects.count()
        
        # Calculate revenue: completed/confirmed bookings sum (price * people)
        # Using F expressions for database level multiplication
        confirmed_bookings = Booking.objects.filter(status='confirmed')
        revenue_agg = confirmed_bookings.aggregate(
            total=Sum(F('destination__price') * F('number_of_people'))
        )
        total_revenue = revenue_agg['total'] or 0.0

        total_bookings = Booking.objects.count()
        pending_bookings = Booking.objects.filter(status='pending').count()

        return Response({
            "total_destinations": total_destinations,
            "total_users": total_users,
            "total_revenue": total_revenue,
            "total_bookings": total_bookings,
            "pending_bookings": pending_bookings,
        })