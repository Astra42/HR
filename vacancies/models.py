from resumes.models import *
from user.models.departments import Department


class Vacancy(models.Model):
    title = models.CharField(max_length=50, verbose_name="Title")
    is_published = models.BooleanField(default=True,
                                       verbose_name="Is published")
    description = models.TextField(verbose_name="Description", )
    created_date = models.DateTimeField(auto_now_add=True,
                                        verbose_name="Created")
    updated_date = models.DateTimeField(auto_now=True, verbose_name="Updated")
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE,
                                   verbose_name="Creator")
    slug = models.SlugField(max_length=55, unique=True, verbose_name="URL",
                            blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL,
                                   null=True, blank=True,
                                   verbose_name='department')
    qualification = models.TextField(verbose_name="Qualifications", )
    salary_from = models.IntegerField(null=True, verbose_name="Salary from")
    salary_to = models.IntegerField(null=True, verbose_name="Salary to")
    resumes = models.ManyToManyField(Resume, blank=True)
    reviews = models.IntegerField(default=0, verbose_name='Reviews')

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        """Slug generator"""
        if not self.slug:
            a = 0
            new_slug = "".join(c for c in self.title if c.isalnum())

            while Vacancy.objects.filter(slug=f"{new_slug}-{a}").exists():
                a += 1

            self.slug = f"{new_slug}-{a}"
        super(Vacancy, self).save()

    class Meta:
        ordering = ["-created_date", "updated_date"]
        verbose_name = 'vacancy'
        verbose_name_plural = 'vacancies'

    def __str__(self):
        return str(self.pk) + self.title
