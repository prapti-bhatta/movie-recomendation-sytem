from django.conf.urls import url, include
from rest_framework import routers
from .views import BySimilarUsersViewSet, ByOthersAlsoLikedViewSet

router = routers.DefaultRouter()
router.register(r'similar-users', BySimilarUsersViewSet)
router.register(r'others-liked', ByOthersAlsoLikedViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
