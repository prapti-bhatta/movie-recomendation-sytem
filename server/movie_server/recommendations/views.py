from rest_framework import viewsets
from .models import BySimilarUsers
from .serializers import BySimilarUsersSerializer
from rest_framework.pagination import LimitOffsetPagination


class BySimilarUsersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BySimilarUsers.objects.all()
    serializer_class = BySimilarUsersSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = BySimilarUsers.objects.all()
        queryset = queryset.filter(user=self.request.user)
        queryset = queryset.extra(order_by=['-rating'])
        return queryset
