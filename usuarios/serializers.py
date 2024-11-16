from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class Usuarioserializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'nombre', 'apellido', 'rol', 'estado']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validate_data):
        # Si el estado es 'inactivo', asegúrate de poner is_active=False
        estado = validate_data.get('estado', 'activo')
        user = CustomUser.objects.create_user(
            email=validate_data['email'],
            nombre=validate_data['nombre'],
            apellido=validate_data['apellido'],
            estado=estado
        )
        user.set_password(validate_data['password'])
        user.is_active = (estado == 'activo')  # Solo actívalo si 'estado' es 'activo'
        user.save()
        return user


    def createSuper(self, validate_data):
        return CustomUser.objects.create_superuser(**validate_data)
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        
        if password:
            user.set_password(password)
            user.save()
        
        return user

#Modificacion al serilaizador jwt para tomar el nuestro modelo de usuario
from django.contrib.auth import authenticate
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Campos adicionales para token
        token['email'] = user.email
        token['nombre'] = user.nombre
        token['apellido'] = user.apellido
        token['rol'] = user.rol
        return token

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Se requieren tanto el email como la contraseña.")

        # Usa authenticate para verificar el usuario y la contraseña
        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError("Credenciales inválidas.")

        if not user.is_active:
            raise serializers.ValidationError("La cuenta no está activa.")

        # Continúa con la validación de otros campos si es necesario
        return super().validate(attrs)
