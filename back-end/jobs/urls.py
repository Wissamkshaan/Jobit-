from rest_framework import routers
from .views import UserProfileViewSet, CategoryViewSet, JobViewSet, ApplicationViewSet


router = routers.DefaultRouter()
router.register(r'user-profiles', UserProfileViewSet, basename='userprofile')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = router.urls
