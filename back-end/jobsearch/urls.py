from django.contrib import admin
from django.urls import path, include
from jobs.views import EmployerRegistrationAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('jobs.urls')),
    path('register/', EmployerRegistrationAPIView.as_view(), name='register'),
]

