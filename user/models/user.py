from django.contrib.auth import get_user_model
from django.db import models

from rest_framework_simplejwt.tokens import RefreshToken

from user.models.role import Role
from user.models.tags import Tag
from user.models.departments import Department


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, unique=True)
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Фото", blank=True)
    roles = models.ManyToManyField(Role, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    is_verified = models.BooleanField(default=False)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name="department", blank=True)

    class Meta:
        # ordering = ["-date_joined", "username"]
        verbose_name = 'profile'
        verbose_name_plural = 'profiles'

    def __str__(self):
        if self.user.first_name!='' and self.user.last_name!='':
            return self.user.username + ' | ' + self.user.first_name.title() + ' ' + self.user.last_name.title()
        return self.user.username

    def tokens(self):
        refresh = RefreshToken.for_user(self.user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


