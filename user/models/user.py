from django.db import models
from django.contrib.auth.models import User

from user.models.role import Roles
from user.models.tags import Tags


class User(User):
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Фото")
    roles = models.ManyToManyField(Roles)
    tags = models.ManyToManyField(Tags)
    
    class Meta():
        ordering = ["-date_joined", "username"]
