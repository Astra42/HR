
from resumes.models import *


class Tags(models.Model):
    title = models.CharField(max_length=50, unique=True, verbose_name="Tag")