from resumes.models import *

class Vacansies(models.Model):
    title = models.CharField(max_length=50, verbose_name="Title")
    is_published = models.BooleanField(default=True, verbose_name="Is published")
    description = models.TextField(verbose_name="Description",)
    qualification = models.TextField(verbose_name="Qualifications",)
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created")
    updated_date = models.DateTimeField(auto_now=True, verbose_name="Updated")
    creator_id = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Creator")

class VacancyResumes(models.Model):
    resume_id = models.ForeignKey(Resumes, on_delete=models.CASCADE, verbose_name="Resume ID")
    vacancy_id = models.ForeignKey(Vacansies, on_delete=models.CASCADE, verbose_name="Vacancy ID")
