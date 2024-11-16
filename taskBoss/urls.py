from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

# Descripción del proyecto con Markdown
descripcion = """
#
![Logo de TaskBoss](https://imgur.com/iELWk15.png)
TaskBoss es una plataforma diseñada para la gestión eficiente de tareas, insignias y usuarios en un entorno empresarial. La plataforma ofrece un sistema de asignación de tareas, monitoreo del progreso y un sistema de recompensas a través de insignias.
## Funcionalidades
- **Gestión de usuarios:** Administración de perfiles de usuario.
- **Sistema de tareas:** Creación y seguimiento de tareas.
- **Insignias:** Reconocimiento por logros.

## Enlaces útiles
- [Video Comercial](https://youtu.be/shjX9PhBoEU)
- [Manual de Usuario](https://drive.google.com/file/d/1ZE4s3gAQ3DgIvQ0JiUDP_pw6QbdbC1cY/view?usp=sharing)

"""

# Configuración de Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="TaskBoss API",
        default_version='v1',
        description=descripcion,

    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Definición de URL
urlpatterns = [
    # Rutas administrativas y de las aplicaciones
    path('admin/', admin.site.urls),  # Ruta del panel de administración
    path('usuarios/', include('usuarios.urls')),  # API para la aplicación usuarios
    path('tareas/', include('tareas.urls')),  # API para la aplicación tareas
    path('insignias/', include('insignias.urls')),  # API para la aplicación insignias
    path('reportes/', include('reportes.urls')),
    # Rutas para la documentación generada por Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # Swagger UI
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  # Redoc UI
]
