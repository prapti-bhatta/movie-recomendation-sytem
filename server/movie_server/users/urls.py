from django.conf.urls import url, include
from rest_framework import routers
from .views import UserViewSet, CurrentUserView


router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    url('me/', CurrentUserView.as_view()),
    url(r'^', include(router.urls))
]
