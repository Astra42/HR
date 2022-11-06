import random

from django.contrib.auth import get_user_model
from django.db import models

from rest_framework_simplejwt.tokens import RefreshToken

from user.models.role import Role
from user.models.tags import Tag


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, unique=True)
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Фото", blank=True)
    roles = models.ManyToManyField(Role, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    is_verified = models.BooleanField(default=False)
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL", blank=True)

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.slug:
            a = random.randint(100, 1000)
            while Profile.objects.filter(slug=f"{self.user.username}-{a}").exists():
                a = random.randint(100, 1000)
            self.slug = f"{self.user.username}-{a}"
        super(Profile, self).save()

    class Meta():
        # ordering = ["-date_joined", "username"]
        verbose_name = 'profile'
        verbose_name_plural = 'profiles'

    def __str__(self):
        return self.user.username

    def tokens(self):
        refresh = RefreshToken.for_user(self.user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
