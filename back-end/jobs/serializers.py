from rest_framework import serializers
from .models import Job, Application, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'created_at', 'category', 'category_name']

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'job', 'applicant', 'resume', 'applied_at']
