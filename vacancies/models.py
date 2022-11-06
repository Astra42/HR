from resumes.models import *
from user.models.departments import Department


class Vacancy(models.Model):
    is_published = models.BooleanField(default=True, verbose_name="Is published")
    title = models.CharField(max_length=50, verbose_name="Title")
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Creator")
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='department')
    salary_from = models.IntegerField(verbose_name="Salary from")
    salary_to = models.IntegerField(verbose_name="Salary to")
    description = models.TextField(verbose_name="Description",)
    qualification = models.TextField(verbose_name="Qualifications",)
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created")
    updated_date = models.DateTimeField(auto_now=True, verbose_name="Updated")
    resumes = models.ManyToManyField(Resume, blank=True)
    reviews = models.IntegerField(default=0, verbose_name='Reviews')
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL")
    
    class Meta:
        ordering = ["-created_date", "updated_date"]
        verbose_name = 'vacancy'
        verbose_name_plural = 'vacancies'

    def __str__(self):
        return str(self.pk) + self.title
