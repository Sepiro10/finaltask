import os
import tempfile
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
import matplotlib.pyplot as plt
from django.core.mail import EmailMessage
from django.db import connection
import requests


def obtener_datos():
    # Realiza la consulta SQL para obtener los datos
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT id, tareas_completadas, tareas_pendientes, total_tareas
            FROM public."estadisticas_tareas";  -- Ajusta el nombre de la tabla
        """)
        columnas = [col[0] for col in cursor.description]
        resultados = cursor.fetchall()
        return columnas, resultados

def generar_grafico_pastel():
    # Obtener los datos
    columnas, resultados = obtener_datos()

    # Sumar las tareas completadas, pendientes y totales
    tareas_completadas = sum([row[1] for row in resultados])  # fila[1] es tareas_completadas
    tareas_pendientes = sum([row[2] for row in resultados])  # fila[2] es tareas_pendientes
    total_tareas = sum([row[3] for row in resultados])  # fila[3] es total_tareas

    # Crear el gráfico de pastel
    labels = ['Completadas', 'Pendientes']
    sizes = [tareas_completadas, tareas_pendientes]
    explode = (0.1, 0)  # Explota la porción de "Completadas" para destacarla

    fig, ax = plt.subplots()
    ax.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%', shadow=True, startangle=140)
    ax.axis('equal')  # Hace que el gráfico sea circular

    # Guardar el gráfico en un objeto BytesIO
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    return buffer, tareas_completadas, tareas_pendientes, total_tareas

def crear_pdf():
    buffer_pdf = BytesIO()
    c = canvas.Canvas(buffer_pdf, pagesize=letter)

    # Título
    c.setFont("Helvetica-Bold", 20)
    c.drawString(100, 750, "TaskBoss")

    # Descripción del reporte
    c.setFont("Helvetica", 12)
    c.drawString(100, 710, "Este reporte muestra un resumen detallado de las tareas realizadas y pendientes.")

    # Gráfico de pastel
    grafico_pastel, tareas_completadas, tareas_pendientes, total_tareas = generar_grafico_pastel()
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp_file:
        grafico_path = temp_file.name
        with open(grafico_path, "wb") as f:
            f.write(grafico_pastel.read())
    c.drawImage(grafico_path, 100, 450, width=400, height=200)

    # Información de las tareas alrededor del gráfico
    c.setFont("Helvetica", 10)
    c.drawString(100, 380, f"Tareas Completadas: {tareas_completadas}")
    c.drawString(100, 360, f"Tareas Pendientes: {tareas_pendientes}")
    c.drawString(100, 340, f"Total de Tareas: {total_tareas}")

    c.save()
    buffer_pdf.seek(0)
    return buffer_pdf


def enviar_reporte_por_correo():
    # Crear el PDF
    pdf_buffer = crear_pdf()

    # Configurar y enviar el correo
    correo = EmailMessage(
        subject='Reporte de Tareas en PDF',
        body='Adjunto se encuentra el reporte detallado sobre las tareas del proyecto.',
        from_email='taskboss2024@gmail.com',
        to=['sebastianpinedarodriguez10@gmail.com'],
    )

    # Adjuntar el PDF
    correo.attach('reporte_tareas.pdf', pdf_buffer.read(), 'application/pdf')

    # Enviar el correo
    correo.send()
