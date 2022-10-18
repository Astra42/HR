from django.db import models


class Roles(models.Model):
    title = models.CharField(max_length=50, verbose_name="Role")






