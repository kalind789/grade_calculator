from django.db import models
from django.contrib.auth.models import User
# Need a better commmit message lol

# Class model
class Class(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class_name = models.CharField(max_length=100)
    class_semester = models.CharField(max_length=100)

    def calculate_total_grade(self):
        """
        Calculate the total grade for the class by summing all weighted section scores.
        """
        total_score = sum([section.calculate_weighted_score() for section in self.sections.all()])
        return total_score

    def __str__(self):
        return self.class_name

# AssignmentType (Section) model
class AssignmentType(models.Model):
    class_instance = models.ForeignKey(
        Class, on_delete=models.CASCADE, related_name="sections"
    )
    type_name = models.CharField(max_length=50)
    weight = models.FloatField()

    def calculate_weighted_score(self):
        """
        Calculate the weighted score for this section based on its assignments.
        """
        total_score = sum([assignment.calculate_grade_percentage() for assignment in self.assignments.all()])
        return total_score * (self.weight / 100)

    def __str__(self):
        return f"{self.type_name} - {self.class_instance.class_name}"


# Assignment model
class Assignment(models.Model):
    assignment_type = models.ForeignKey(
        AssignmentType, on_delete=models.CASCADE, related_name="assignments"
    )
    name = models.CharField(max_length=100)
    grade = models.FloatField()
    max_grade = models.FloatField(default=100)
    date_assigned = models.DateField(null=True, blank=True)
    date_due = models.DateField(null=True, blank=True)

    def calculate_grade_percentage(self):
        """
        Calculate the grade percentage for this assignment.
        """
        if self.max_grade == 0:
            return 0
        return (self.grade / self.max_grade) * 100

    def __str__(self):
        return self.name