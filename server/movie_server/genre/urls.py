from django.conf.urls import url, include
from rest_framework import routers
from .views import GenreViewSet

router = routers.DefaultRouter()
router.register(r'', GenreViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
