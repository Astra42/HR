from django.contrib import admin
from django.contrib.auth import get_user_model
from django.utils.safestring import mark_safe

from .models.phone import Phone
from .models.role import Role
from .models.tags import Tag
from .models.user import User
from .models.departments import Department


class PhoneInline(admin.TabularInline):
    model = Phone
    extra = 0
    fields = ('number', )


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = (PhoneInline,)
    filter_horizontal = ("roles", "tags", )
    list_display = ("username", "first_name", "last_name", "email", "created_at", "slug",)
    search_fields = ("username", "email")
    list_filter = ("created_at", )

    readonly_fields = (
        'last_login',
        'created_at',
        'updated_at',
        'get_photo',
        'password',
    )

    fields = (
        'username',
        'email',
        'is_verified',
        'is_active',
        'is_staff',
        'is_head',
        'first_name',
        'last_name',
        'birth_date',
        'country',
        'about_me',
        'photo',
        'get_photo',
        'roles',
        'tags',
        'departments',
        'last_login',
        'created_at',
        'updated_at',
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
    list_display = ("title", "slug")
    search_fields = ("title",)

    fields = [
        'title',
        'description',
        'slug',
    ]


@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    all = ("number", 'user')
    list_display = all
    search_fields = all
    fields = all



