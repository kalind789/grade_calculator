from rest_framework import serializers
from .models import Class, AssignmentType, Assignment

class AssignmentSerializer(serializers.ModelSerializer):
    grade_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = ['id', 'name', 'grade', 'max_grade', 'date_assigned', 
                 'date_due', 'grade_percentage', 'assignment_type']
    
    def get_grade_percentage(self, obj):
        return obj.calculate_grade_percentage()

class AssignmentTypeSerializer(serializers.ModelSerializer):
    assignments = AssignmentSerializer(many=True, read_only=True)
    weighted_score = serializers.SerializerMethodField()

    class Meta:
        model = AssignmentType
        fields = ['id', 'type_name', 'weight', 'assignments', 'weighted_score']

    def get_weighted_score(self, obj):
        return obj.calculate_weighted_score()

class ClassSerializer(serializers.ModelSerializer):
    sections = AssignmentTypeSerializer(many=True, read_only=True)
    total_grade = serializers.SerializerMethodField()

    class Meta:
        model = Class
        fields = ['id', 'class_name', 'class_semester', 'user', 'sections', 'total_grade']

    def get_total_grade(self, obj):
        return obj.calculate_total_grade()
