from rest_framework import serializers

from .models import Room, Sounds


class SoundsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sounds
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'image', 'sound')
