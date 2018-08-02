from django.conf.urls import url, include
from rest_framework import routers
from .views import BySimilarUsersViewSet

router = routers.DefaultRouter()
router.register(r'similar-users', BySimilarUsersViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
