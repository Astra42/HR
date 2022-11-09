from rest_framework import permissions

from resumes.models import Resume
from user.models import User

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']


class IsHead(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if user.is_staff or user.is_superuser or user.is_head:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if user.is_staff or user.is_superuser:
            return True

        if user.is_head and user.departments == obj.department:
            return True

        return False


class RepliesPermission(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_head and user.departments == obj.department:
            return True

        return False


class ResumeAccept(permissions.BasePermission):

    def has_permission(self, request, view, *args, **kwargs):
        slug = request.resolver_match.kwargs["resume_slug"]
        resume = Resume.objects.get(slug=slug)
        user = User.objects.get(id=request.user.id)
        if user.id == resume.creator_id.id:
            return True

        return False
