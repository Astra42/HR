from django.contrib import admin
from django.contrib.auth import get_user_model
from django.utils.safestring import mark_safe

from .models.role import Role
from .models.tags import Tag
from .models.user import User
from .models.departments import Department


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "created_at",)
    search_fields = ("username", "email")
    list_filter = ("created_at", )

    readonly_fields = (
        'last_login',
        'created_at',
        'password',
    )

    def get_photo(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" height="200">')

    get_photo.short_description = 'Avatar'

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)

    fields = [
        'title',
        'description',
        'slug',
    ]



