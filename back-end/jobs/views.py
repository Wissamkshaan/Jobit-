from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, Category, Job, Application
from .serializers import UserProfileSerializer, CategorySerializer, JobSerializer, ApplicationSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

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

