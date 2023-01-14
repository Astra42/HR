from rest_framework import permissions
from django.shortcuts import get_object_or_404
from resumes.models import Resume
from user.models import User
from vacancies.models import Vacancy
from resumes.models import Resume

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']


class IsNotEmployee(permissions.BasePermission):
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

    def has_permission(self, request, view):
        slug = request.resolver_match.kwargs["vacancy_slug"]
        vacancy = get_object_or_404(Vacancy.objects.all(), slug=slug)
        user = User.objects.get(id=request.user.id)
        if user.is_head and user.departments == vacancy.department:
            return True

        return False


class ResumePermission(permissions.BasePermission):
    def has_permission(self, request, view, *args, **kwargs):
        user = request.user
        try:
            resume = Resume.objects.get(creator_id=user.id)
        except Resume.DoesNotExist:
            resume = None

        if request.method == 'POST' and resume is None:
            return True

        if user.is_head and request.method in SAFE_METHODS:
            return True

        if user.is_staff:
            return True

        return False


class ResumeDetailPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_staff or user.is_superuser:
            return True

        if user.id == obj.creator_id_id:
            return True

        if user.is_head and request.method in SAFE_METHODS:
            return True

        return False

