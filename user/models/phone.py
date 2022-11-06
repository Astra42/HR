from django.db import models
from user.models.user import User
from phonenumber_field.modelfields import PhoneNumberField


class Phone(models.Model):
    number = PhoneNumberField(blank=True, null=True, unique=True, verbose_name="Phone")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'phone'

    def __str__(self):
        return str(self.number)
