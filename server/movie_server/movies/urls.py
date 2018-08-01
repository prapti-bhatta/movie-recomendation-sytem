from django.conf.urls import url, include
from rest_framework import routers
from .views import MovieViewSet, MovieReviewViewSet

router = routers.DefaultRouter()
router.register(r'reviews', MovieReviewViewSet)
router.register(r'', MovieViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
