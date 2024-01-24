from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
# import uuid
from .models import Category, Job, Application
from .serializers import CategorySerializer, JobSerializer, ApplicationSerializer

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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        

        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Set the applicant field to the applicant's name
        serializer.validated_data['applicant'] = request.data.get('applicant_name', 'Job Seeker')

        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


