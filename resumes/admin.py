from django.contrib import admin
from .models import *


class ResumesAdmin(admin.ModelAdmin):
    list_display = ("creator_id", "created_date", "updated_date", "is_published")
    search_fields = ("creator_id", "created_date")
    list_editable = ("is_published",)
    list_filter = ("is_published","created_date")


admin.site.register(Resumes, ResumesAdmin)
