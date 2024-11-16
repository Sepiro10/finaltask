from django.db import models
from usuarios.models import CustomUser

from django.db import models
from django.contrib.auth.models import User  # Importa el modelo User si estás usando el modelo de usuario por defecto

class Badge(models.Model):
    name = models.CharField(max_length=100)  # Nombre de la insignia
    description = models.TextField()           # Descripción de la insignia
    points_required = models.IntegerField()    # Puntos necesarios para obtener la insignia

    def __str__(self):
        return self.name  # Retorna el nombre de la insignia al representar el objeto


class UserBadge(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Relación con el modelo User
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)  # Relación con el modelo Badge
    awarded_at = models.DateField(auto_now_add=True)  # Fecha en que se otorga la insignia

    def __str__(self):
        return f"{self.user.nombre} - {self.badge.name}"  # Retorna una representación del objeto

