from django.db.models import fields
from rest_framework import serializers
from .models import Task

# This class helps REST api to be able to use and process the data. It serializes the object to json with all the fields.

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'