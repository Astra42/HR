from resumes.models import *


class Tag(models.Model):
    title = models.CharField(max_length=50, unique=True, verbose_name="Tag")

    class Meta:
        verbose_name = 'tag'

    def __str__(self):
        return self.title
