from .models import Task
from rest_framework import serializers

class taskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id',"title", "description", "priority", "status", "deadline", "assigned_to", "assigned_by", "points"]
    
    def crear(self, validated_data):
        return Task.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.status = validated_data.get('status', instance.status)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.assigned_to = validated_data.get('assigned_to', instance.assigned_to)
        instance.assigned_by = validated_data.get('assigned_by', instance.assigned_by)
        instance.points = validated_data.get('points', instance.points)

        # Guarda la instancia actualizada
        instance.save()
        return instance
