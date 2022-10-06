
from resumes.models import *


class Tags(models.Model):
    title = models.CharField(max_length=50, unique=True, verbose_name="Tag")


class UserTags(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE, primary_key=True, verbose_name="User ID")
    tag_id = models.ForeignKey(Tags, on_delete=models.CASCADE, primary_key=True, verbose_name="Tag ID")


class ResumeTags(models.Model):
    resume_id = models.ForeignKey(Resumes, on_delete=models.CASCADE, primary_key=True, verbose_name="Resume ID")
    tag_id = models.ForeignKey(Tags, on_delete=models.CASCADE, primary_key=True, verbose_name="Tag ID")
