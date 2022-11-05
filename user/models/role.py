from django.db import models


class Role(models.Model):
    title = models.CharField(max_length=50, verbose_name="Role")

    class Meta:
        verbose_name = 'role'

    def __str__(self):
        return self.title
