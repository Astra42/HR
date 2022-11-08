from rest_framework import serializers
from .models import Resume
from user.serializers.profile import ProfileSerializer


class ResumeSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = Resume
        fields = [
            'profile',
            'title',
            'experience', 'description',
            'doc',
            'is_published',
        ]
        lookup_field = 'slug'
