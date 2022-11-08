from resumes.models import *
from user.models.departments import Department


class Vacancy(ResumeMixin, models.Model):
    department = models.ForeignKey(Department, on_delete=models.SET_NULL,
                                   null=True, blank=True,
                                   verbose_name='department')
    qualification = models.TextField(verbose_name="Qualifications",)
    salary_from = models.IntegerField(null=True, verbose_name="Salary from")
    salary_to = models.IntegerField(null=True, verbose_name="Salary to")
    resumes = models.ManyToManyField(Resume, blank=True)
    reviews = models.IntegerField(default=0, verbose_name='Reviews')

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.slug:
            a=0
            while Vacancy.objects.filter(slug=f"{self.title}-{a}").exists():
                a+=1
            self.slug = f"{self.title}-{a}"
        super(Vacancy, self).save()
    
    class Meta:
        ordering = ["-created_date", "updated_date"]
        verbose_name = 'vacancy'
        verbose_name_plural = 'vacancies'

    def __str__(self):
        return str(self.pk) + self.title
