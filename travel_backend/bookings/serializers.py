from rest_framework import serializers
from .models import Booking
from destinations.models import Destination
from destinations.serializers import DestinationSerializer


class BookingSerializer(serializers.ModelSerializer):
    destination = DestinationSerializer(read_only=True)

    destination_id = serializers.PrimaryKeyRelatedField(
        queryset=Destination.objects.all(),
        source="destination",
        write_only=True
    )

    number_of_people = serializers.IntegerField(
        default=1,
        required=False
    )

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = ["user", "status"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        validated_data.setdefault("number_of_people", 1)
        return super().create(validated_data)


class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["status"]