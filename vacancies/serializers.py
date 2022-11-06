from rest_framework import serializers
from .models import Vacancy


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = [
            'title', 'creator_id',
            'salary_from', 'salary_to',
            'qualification', 'description',
            'created_date', 'updated_date',
        ]
        lookup_field = 'slug'
