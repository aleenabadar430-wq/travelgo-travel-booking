from rest_framework import serializers
from .models import Destination

class DestinationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get('request')
        if not obj.image:
            return None

        # obj.image.name holds the raw DB string value
        image_name = obj.image.name
        
        # If it's a legacy external URL, return it directly
        if image_name and image_name.startswith(('http://', 'https://')):
            return image_name

        # If it's a local file upload, correctly build full URL
        if request is not None and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url if hasattr(obj.image, 'url') else None