from django.db import models
from django.contrib.auth.models import User


class Users(User):
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Фото")