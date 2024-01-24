from rest_framework import routers
from .views import CategoryViewSet, JobViewSet, ApplicationViewSet


router = routers.DefaultRouter()

router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = router.urls
