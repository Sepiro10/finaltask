from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import EmailValidator
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

class CustomUserManager(BaseUserManager):
    #la forma en que se crean los usuarios
    def create_user(self, email, nombre, apellido, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, nombre=nombre, apellido=apellido, **extra_fields)
        user.set_password(password)

        user.save(using=self._db)
        return user

    #la forma en que se crea el super usuarios
    def create_superuser(self, email, nombre, apellido, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, nombre, apellido, password, **extra_fields)

#Modelo de los usuarios
class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROL_CHOICES = [
        ('Jefe', 'Jefe'),
        ('Empleado', 'Empleado'),
    ]
    email = models.EmailField(max_length=100, unique=True, validators=[EmailValidator()])
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    estado = models.CharField(max_length=10, choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')], default='pendiente')
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default='Empleado')
    F_creac = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    #Trae la forma en que se crean los usuarios y super usuarios
    objects = CustomUserManager()
    
    #Cambia la forma de autentificacion para que sea con el email
    USERNAME_FIELD = 'email'
    
    #Para crear el super suario son necesarios los campos
    REQUIRED_FIELDS = ['nombre', 'apellido']

    groups = models.ManyToManyField(
    'auth.Group',
    related_name='customuser_set',
    blank=True,
    help_text='The groups this user belongs to.',
    verbose_name='groups',)

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.email})"
