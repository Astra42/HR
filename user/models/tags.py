
from resumes.models import *


class Tag(models.Model):
    title = models.CharField(max_length=50, unique=True, verbose_name="Tag")

    class Meta:
        verbose_name = 'tag'
        verbose_name_plural = 'tags'

    def __str__(self):
        return self.title