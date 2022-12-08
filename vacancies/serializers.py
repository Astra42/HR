from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from resumes.models import Resume
from user.models import User
from user.serializers.profile import PhoneSerializer
from .models import Vacancy


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = [
            'title', 'salary_from', 'salary_to', 'qualification',
            'description', 'slug',
        ]
        lookup_field = 'slug'


class CreatorSerializer(serializers.ModelSerializer):
    """Returns brief information about the resume creator."""
    country = CountryField(name_only=True)
    phone_set = PhoneSerializer(many=True)

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'email', 'phone_set', 'departments',
            'country', 'roles'
        ]


class ResumeListSerializer(serializers.ModelSerializer):
    creator_id = CreatorSerializer(read_only=True)

    class Meta:
        model = Resume
        fields = [
            'title',
            'creator_id'
        ]


class RepliesSerializer(serializers.ModelSerializer):
    resumes = ResumeListSerializer(read_only=True, many=True)
    lookup_field = 'slug'

    class Meta:
        model = Vacancy
        fields = ['resumes']


class VacancyStatusSerializer(serializers.ModelSerializer):
    is_published = serializers.BooleanField()
    lookup_field = 'slug'

    class Meta:
        model = Vacancy
        fields = ['is_published']
