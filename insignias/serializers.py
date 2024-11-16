from .models import Badge, UserBadge
from rest_framework import serializers

class badgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'description', 'points_required']
    
    def crear(self, validated_data):
        return Badge.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.points_required = validated_data.get('points_required', instance.points_required)
        
        instance.save()
        return instance
    
class userBadgeSerializer(serializers.ModelSerializer):
    badge = badgeSerializer()
    class Meta:
        model = UserBadge
        fields = ['id', 'user', 'badge']
        
    def create(self, validated_data):
        return UserBadge.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.badge = validated_data.get('badge', instance.badge)
        instance.awarded_at = validated_data.get('awarded_at', instance.awarded_at)
        
        instance.save()
        return instance