from django.db import models


class Department(models.Model):
    title = models.CharField(max_length=50, unique=True, verbose_name="Department")
    head = models.OneToOneField('user.User', blank=True, null=True, on_delete=models.SET_NULL, related_name='head')
    description = models.TextField(verbose_name="Description", blank=True)
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL")

    class Meta:
        verbose_name = 'department'

    def __str__(self):
        return self.title

