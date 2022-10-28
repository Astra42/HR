from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from user.models.role import Role
from user.models.tags import Tag


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, unique=True)
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Фото", blank=True)
    roles = models.ManyToManyField(Role, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    class Meta():
        # ordering = ["-date_joined", "username"]
        verbose_name = 'profile'
        verbose_name_plural = 'profiles'

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
