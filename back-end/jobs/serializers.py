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
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    # Include UserProfile fields
    company_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'company_name']

class EmployerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
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