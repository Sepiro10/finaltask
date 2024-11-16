from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def sendMailTask(title, assigned_to, deadline):
    # Contexto para la plantilla
    context = {
        'title': title,
        'deadline': deadline,
    }
    
    # Renderiza el HTML
    html_message = render_to_string(
        '../Templates/email_template.html',
        context
    )
    
    # Versión plain text del mensaje
    plain_message = strip_tags(html_message)
    
    asunto = f"✨ Nueva tarea asignada: {title}"
    remitente = settings.EMAIL_HOST_USER
    
    # Envío de correo
    send_mail(
        subject=asunto,
        message=plain_message,
        from_email=remitente,
        recipient_list=[assigned_to],
        html_message=html_message,
        fail_silently=False
    )