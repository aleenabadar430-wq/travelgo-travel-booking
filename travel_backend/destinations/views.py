from django.shortcuts import render
from django_filters import OrderingFilter
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Destination
from .serializers import DestinationSerializer
from .permissions import IsAdminRole
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# Create your views here.

class DestinationListView(generics.ListAPIView):
    queryset = Destination.objects.all().order_by('-created_at')
    serializer_class = DestinationSerializer
    permission_classes = [AllowAny]

    filter_backends = [DjangoFilterBackend, SearchFilter,OrderingFilter]  
    filterset_fields = ["location", "price"]
    search_fields = ["name"]
    ordering_fields = ["price", "created_at"]

from users.models import ActivityLog

class DestinationCreateView(generics.CreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        dest = serializer.save()
        ActivityLog.objects.create(
            user=self.request.user,
            action=f"Added new destination: '{dest.name}'"
        )

class DestinationUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]  
        return [IsAuthenticated(), IsAdminRole()] 

    def perform_destroy(self, instance):
        action_text = f"Deleted destination: '{instance.name}'"
        instance.delete()
        ActivityLog.objects.create(
            user=self.request.user,
            action=action_text
        )