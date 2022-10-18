from django.contrib import admin
from .models.role import Roles
from .models.tags import Tags
from .models.user import User


admin.site.register(Roles)
admin.site.register(Tags)
admin.site.register(User)
