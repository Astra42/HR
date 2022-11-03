from resumes.models import *
from django.db import models
from .user import *


class Department(models.Model):
    title = models.CharField(max_length=50, unique=True, verbose_name="Department")
    head = models.OneToOneField(Profile)
    description = models.TextField(verbose_name="Description", blank=True)
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL")

    class Meta:
        verbose_name = 'department'

    def str(self):
        return self.title