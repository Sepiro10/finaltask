from django.shortcuts import render

# Create your views here.
# reportes/views.py

from django.http import HttpResponse
from .utils import enviar_reporte_por_correo

def enviar_reporte_view(request):
    enviar_reporte_por_correo()
    return HttpResponse("Reporte enviado por correo.")
