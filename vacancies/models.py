from resumes.models import *
from user.models.departments import Department


class Vacancy(models.Model):
    title = models.CharField(max_length=50, verbose_name="Title")
    is_published = models.BooleanField(default=True, verbose_name="Is published")
    department = models.ForeignKey(Department, on_delete=models.SET_NULL,
                                   null=True, blank=True,
                                   verbose_name='department')
    description = models.TextField(verbose_name="Description",)
    qualification = models.TextField(verbose_name="Qualifications",)
    salary_from = models.IntegerField(null=True, verbose_name="Salary from")
    salary_to = models.IntegerField(null=True, verbose_name="Salary to")
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created")
    updated_date = models.DateTimeField(auto_now=True, verbose_name="Updated")
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Creator")
    resumes = models.ManyToManyField(Resume, blank=True)
    reviews = models.IntegerField(default=0, verbose_name='Reviews')
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL", blank=True)


    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.slug:
            a=0
            while Vacancy.objects.filter(slug=f"{self.title}-{a}").exists():
                a+=1
            self.slug = f"{self.title.replace(' ', '-')}-{a}"
        super(Vacancy, self).save()
    
    class Meta:
        ordering = ["-created_date", "updated_date"]
        verbose_name = 'vacancy'
        verbose_name_plural = 'vacancies'

    def __str__(self):
        return str(self.pk) + self.title
