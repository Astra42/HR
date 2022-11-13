from rest_framework import permissions
from django.shortcuts import get_object_or_404
from resumes.models import Resume
from user.models import User
from vacancies.models import Vacancy

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']


class IsHeadOrEmployee(permissions.BasePermission):

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



class IsResumeCreator(permissions.BasePermission):

    def has_permission(self, request, view, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        resume = get_object_or_404(Resume.objects.all(), creator_id=user.id)

        if user.id == resume.creator_id.id:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_staff or user.is_superuser:
            return True

        if user.id == obj.creator_id:
            return True

        if user.is_head and request.method in SAFE_METHODS:
            return True

        return False