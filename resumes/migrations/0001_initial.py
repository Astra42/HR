# Generated by Django 4.1.2 on 2022-10-18 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resumes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('is_published', models.BooleanField(default=True, verbose_name='Is published')),
                ('description', models.TextField(verbose_name='Description')),
                ('experience', models.TextField(blank=True, verbose_name='Experience')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated_date', models.DateTimeField(auto_now=True, verbose_name='Updated')),
            ],
        ),
    ]