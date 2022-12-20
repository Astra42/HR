from rest_framework import serializers
from .models import Resume
from user.serializers.profile import ProfileSerializer


class ResumeSerializer(serializers.ModelSerializer):
    creator_id = ProfileSerializer(read_only=True)

    class Meta:
        model = Resume
        fields = [
            'title',
            'experience', 'description',
            'doc',
            'is_published',
            'updated_date',
            'slug',
            'creator_id',
        ]
        read_only_fields = ['creator_id']
