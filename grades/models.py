from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Class(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class_name = models.CharField(max_length=100)
    class_semester = models.CharField(max_length=100)

class AssignmentType(models.Model):
    class_instance = models.ForeignKey(Class, on_delete=models.CASCADE)
    type_name = models.CharField(max_length=50)
    weight = models.FloatField()

class Assignment(models.Model):
    assignment_type = models.ForeignKey(AssignmentType, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    grade = models.FloatField()
    max_grade = models.FloatField(default=100)