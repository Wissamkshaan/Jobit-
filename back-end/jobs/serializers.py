from rest_framework import serializers
from .models import Job, Application, Category, UserProfile
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields ='__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields ='__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class JobSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Job
        fields = ['id', 'title', 'resume', 'applied_at', 'employer', 'category', 'category_name']

class ApplicationSerializer(serializers.ModelSerializer):
    job  = JobSerializer(read_only=True)
    applicant = UserSerializer(read_only=True)
    class Meta:
        model = Application
        fields = '__all__'