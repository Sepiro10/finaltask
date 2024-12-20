# Generated by Django 5.1.1 on 2024-10-03 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('usuarios', '0003_customuser'),
    ]

    operations = [
        migrations.DeleteModel(
            name='usuario',
        ),
        migrations.AddField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to.', related_name='customuser_set', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='customuser_permissions_set', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
