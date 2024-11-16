# reportes/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('enviar-reporte/', views.enviar_reporte_view, name='enviar_reporte'),
]
