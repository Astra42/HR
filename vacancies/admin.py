from django.contrib import admin
from .models import *


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_published", "creator_id", "created_date", "updated_date")
    search_fields = ("title", "creator_id", "created_date")
    list_editable = ("is_published",)
    list_filter = ("is_published", "created_date")
    filter_horizontal = ("resumes",)
    readonly_fields = (
        'slug',
        'created_date',
        'updated_date',
        'reviews',
    )
    fields = [
        "slug",
        "title",
        "is_published",
        "department",
        "description",
        "qualification",
        "salary_from",
        "salary_to",
        "created_date",
        "updated_date",
        "creator_id",
        "resumes",
        "reviews",
    ]

