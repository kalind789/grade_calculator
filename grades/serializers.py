from .models import Class
from rest_framework import serializers

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'class_name', 'class_semester', 'user']
        read_only_fields = ['id', 'user']