from django.db import models
from user.models.user import Users


class Roles(models.Model):
    title = models.CharField(max_length=50, verbose_name="Role")


class UserRoles(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE, primary_key=True, verbose_name="User ID")
    role_id = models.ForeignKey(Roles, on_delete=models.CASCADE, primary_key=True, verbose_name="Role ID")





