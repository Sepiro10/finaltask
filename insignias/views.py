from django.shortcuts import render
from rest_framework import generics
from insignias.serializers import badgeSerializer, userBadgeSerializer
from insignias.models import Badge, UserBadge
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

#Crear insignias
class createBadge(generics.CreateAPIView):
    serializer_class = badgeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

# Ver, borrar y editar insignias por id
class detailBadge(generics.RetrieveUpdateDestroyAPIView):
    queryset = Badge.objects.all()
    serializer_class = badgeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
# listar insignias
class listBadge(generics.ListAPIView):
    serializer_class = badgeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Badge.objects.all()
    
#--------------------------------------------------------
#Crear usuario-insignias
class createUserBadge(generics.CreateAPIView):
    serializer_class = userBadgeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

# Ver, borrar y editar usuario-insignias por id
class detailUserBadge(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserBadge.objects.all()
    serializer_class = userBadgeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
# Listar usuario-insignias por portador
"""class ListBadgeByAwarder(APIView):
    serializer_class = userBadgeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = UserBadge.objects.all()"""
    
@api_view(['GET'])
def list_badges_by_user(request):
    user = request.user  # Obtiene el usuario autenticado
    user_badges = UserBadge.objects.filter(user=user)  # Filtra las insignias asociadas al usuario
    serializer = userBadgeSerializer(user_badges, many=True)  # Serializa los datos
    return Response(serializer.data)  # Retorna la respuesta en formato JSON

