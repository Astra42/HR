from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe

from .models.role import Role
from .models.tags import Tag
from .models.user import Profile


admin.site.unregister(User)


class UserInline(admin.StackedInline):
    model = get_user_model()


class ProfileInline(admin.StackedInline):
    model = Profile
    list_display = ('get_photo_to_list', )
    filter_horizontal = ('roles', 'tags')
    fields = (
        "is_verified",
        "photo",
        "get_photo",
        "roles",
        "tags",
    )
    readonly_fields = (
        'get_photo',
    )

    def get_photo(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" height="200">')

    get_photo.short_description = 'Avatar'


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = (ProfileInline,)
    list_display = ("username", "date_joined",)
    search_fields = ("username", "email")
    list_filter = ("date_joined", )
    readonly_fields = (
        'last_login',
        'date_joined',
        'password',
    )


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)




