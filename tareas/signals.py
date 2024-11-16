from django.db.models.signals import post_save
from django.dispatch import receiver
from .serializers import Task
from emails.utils import sendMailTask  # Importa la función de envío

@receiver(post_save, sender=Task)
def sendEmailTaskAssigned(sender, instance, created, **kwargs):
    # Solo enviamos el correo si la Task es nueva y tiene un empleado asignado
    if created and instance.assigned_to:
        sendMailTask(instance.title, instance.assigned_to.email, instance.deadline)