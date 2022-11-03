from django.db import models
from django.contrib.auth.models import User


def path_to_doc(instance, file_name):
    return "resumes/{0}/{1}".format(instance.creator_id, file_name)

class Resume(models.Model):
    title = models.CharField(max_length=50, verbose_name="Title")
    is_published = models.BooleanField(default=True, verbose_name="Is published")
    description = models.TextField(verbose_name="Description",)
    experience = models.TextField(blank=True, verbose_name="Experience",)
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created")
    updated_date = models.DateTimeField(auto_now=True, verbose_name="Updated")
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Creator")
    doc = models.FileField(verbose_name="doc", upload_to=path_to_doc, blank=True)
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL")

    class Meta:
        ordering = ["-created_date", "updated_date"]
        verbose_name = 'resume'
        verbose_name_plural = 'resumes'
