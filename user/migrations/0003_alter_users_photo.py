# Generated by Django 4.1.2 on 2022-10-18 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_users_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='photo',
            field=models.ImageField(upload_to='photo/%Y/%m/%d/', verbose_name='Фото'),
        ),
    ]