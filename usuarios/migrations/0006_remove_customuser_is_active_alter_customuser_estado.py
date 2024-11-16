# Generated by Django 5.1.1 on 2024-11-14 01:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0005_remove_customuser_contrasena'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='is_active',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='estado',
            field=models.CharField(choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')], default='Activo', max_length=10),
        ),
    ]
