# Generated by Django 4.1.2 on 2022-10-18 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
        ('resumes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='resumes',
            name='creator_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.users', verbose_name='Creator'),
        ),
    ]