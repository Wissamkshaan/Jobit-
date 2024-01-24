from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from .models import UserProfile, Category, Job, Application
from .serializers import UserProfileSerializer, CategorySerializer, JobSerializer, ApplicationSerializer, EmployerRegistrationSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_queryset(self):
        category_id = self.request.query_params.get('category', None)
        search_term = self.request.query_params.get('search', None)

        queryset = Job.objects.all()

        if category_id:
            queryset = queryset.filter(category__id=category_id)

        if search_term:
            queryset = queryset.filter(title__icontains=search_term)

        return queryset

    def create(self, request, *args, **kwargs):
       
        category_id = request.data.get('category')

        print(f"Category ID: {category_id}")
        print(f"Request Data: {request.data}")

        if not category_id:
            return Response({'error': 'Category is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the category by ID
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response({'error': f'Category with ID {category_id} does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        # Set the category field on the serializer instance
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['category'] = category

        # Perform create with the serializer
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class EmployerRegistrationAPIView(generics.CreateAPIView):
    serializer_class = EmployerRegistrationSerializer
   

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create User
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
            email=serializer.validated_data['email'],
          
        )

        # Create UserProfile
        UserProfile.objects.create(user=user, company_name=serializer.validated_data['company_name'])

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)