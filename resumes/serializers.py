from rest_framework import serializers
from .models import Resume
from user.serializers.profile import ProfileSerializer


class ResumeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resume
        fields = [
            'title',
            'experience', 'description',
            'doc',
            'is_published',
            'updated_date',
            'slug'
        ]
        lookup_field = 'slug'
