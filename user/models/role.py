from django.db import models


class Role(models.Model):
    title = models.CharField(max_length=50, verbose_name="Role")

    class Meta:
        verbose_name = 'role'
        verbose_name_plural = 'roles'

    def __str__(self):
        return self.title
