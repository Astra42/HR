from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from rest_framework_simplejwt.tokens import RefreshToken

from user.models.role import Role
from user.models.tags import Tag
from user.models.departments import Department


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, **extra_fields):
        if username is None:
            raise TypeError('Users should have a username')
        if email is None:
            raise TypeError('Users should have a Email')

        user = self.model(
            username=username,
            email=self.normalize_email(email).lower(),
            **extra_fields,
        )
        user.set_password(password)
        user.save()

    def create_superuser(self, username, email='admin@admin.admin', password='admin'):
        if password is None:
            raise TypeError('Users should have a password')
        user = self.create_user(username, email, password,
                                is_superuser=True,
                                is_staff=True,
                                is_verified=True)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, db_index=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Фото", blank=True)
    roles = models.ManyToManyField(Role, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    departments = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name="department", blank=True)

    USERNAME_FIELD = 'username'  # default django
    # REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        if self.first_name != '' or self.last_name != '':
            return self.email + ' | ' + self.first_name.title() + ' ' + self.last_name.title()
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

