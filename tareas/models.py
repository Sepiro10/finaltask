from django.db import models
from django.utils import timezone
from usuarios.models import CustomUser

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('Baja', 'Baja'),
        ('Media', 'Media'),
        ('Alta', 'Alta'),
    ]

    STATUS_CHOICES = [
        ('Pendiente', 'Pendiente'),
        ('En Progreso', 'En Progreso'),
        ('Completada', 'Completada'),
    ]

    title = models.CharField(max_length=100)  # Nombre de la tarea
    description = models.TextField()  # Descripción de la tarea
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Media')  # Prioridad (Baja, Media, Alta)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Pendiente')  # Estado (Pendiente, En Progreso, Completada)
    created_at = models.DateTimeField(default=timezone.now)  # Fecha de creación
    deadline = models.DateField(null=True, blank=True)  # Fecha límite (opcional)
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_assigned_to')  # FK empleado
    assigned_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_assigned_by')  # FK jefe
    points = models.PositiveIntegerField(default=0)  # Puntos obtenidos por la tarea completada

    def __str__(self):
        return self.title
