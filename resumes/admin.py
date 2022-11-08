from django.contrib import admin
from .models import *


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_published", "creator_id", "created_date", "updated_date")
    search_fields = ("title", "creator_id", "created_date")
    list_editable = ("is_published",)
    list_filter = ("is_published", "created_date")
    readonly_fields = (
        'slug',
        'created_date',
        'updated_date',
    )
    fields = [
        "slug",
        "title",
        "is_published",
        "description",
        "experience",
        "created_date",
        "updated_date",
        "creator_id",
        "doc",
    ]

