from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import User



# class Employer(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     company_name = models.CharField(max_length=100)

    # def __str__(self):
    #     return self.company_name

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(default="No description available")
    # employer = models.ForeignKey(Employer, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=None, null=True, blank=True)

    def __str__(self):
        return self.title
    
class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applicant = models.CharField(max_length=100, default="Job Seeker", null=True, blank=True)  
    resume = models.FileField(upload_to='resumes/')
    applied_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.applicant} - {self.job.title} Application"

