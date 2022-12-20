from django.db import models
from django.shortcuts import get_object_or_404
import transliterate as tr

from user.models.user import User


def path_to_doc(instance, file_name):
    return "resumes/{0}/{1}".format(instance.creator_id, file_name)


class Resume(models.Model):
    title = models.CharField(max_length=50, verbose_name="Title")
    is_published = models.BooleanField(default=True, verbose_name="Is published")
    description = models.TextField(verbose_name="Description", )
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created")
    updated_date = models.DateTimeField(auto_now=True, verbose_name="Updated")
    creator_id = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Creator")
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL", blank=True)
    experience = models.TextField(blank=True, verbose_name="Experience",)
    doc = models.FileField(verbose_name="doc", upload_to=path_to_doc, blank=True)

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.slug:
            respondent_name = self.creator_id.username
            a = 0
            while Resume.objects.filter(slug=f"{respondent_name}-{a}").exists():
                a += 1
            self.slug = tr.translit('в' + f"{respondent_name}-{a}", reversed=True)[1:]
        super(Resume, self).save()

    class Meta:
        ordering = ["-created_date", "updated_date"]
        verbose_name = 'resume'
        verbose_name_plural = 'resumes'
