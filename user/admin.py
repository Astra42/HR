from django.contrib import admin
from django.utils.safestring import mark_safe
from .models.role import Roles
from .models.tags import Tags
from .models.user import User


class UserAdmin(admin.ModelAdmin):
    list_display = ("username",  "get_html_photo", "date_joined", "get_tags")
    search_fields = ("username",)
    list_filter = ("date_joined", )


    def get_html_photo(self, object):  # mark_safe does'nt screen tags
        if object.photo:
            return mark_safe(f"<img src='{object.photo.url}' width=50>")


    def get_tags(self, obj):
        if obj.tags.all():
            return list(obj.tags.all().values_list('title', flat=True))
        else:
            return 'NA'


class TagsAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


class RolesAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


admin.site.register(Roles, RolesAdmin)
admin.site.register(Tags, TagsAdmin)
admin.site.register(User, UserAdmin)
