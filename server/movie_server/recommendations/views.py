from rest_framework import viewsets
from .models import BySimilarUsers
from django.db.models import Subquery
from .serializers import BySimilarUsersSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.exceptions import ValidationError


class BySimilarUsersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BySimilarUsers.objects.all()
    serializer_class = BySimilarUsersSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = BySimilarUsers.objects.all()
        queryset = queryset.filter(user=self.request.user)
        queryset = queryset.extra(order_by=['-rating'])
        return queryset


class ByOthersAlsoLikedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BySimilarUsers.objects.all()
    serializer_class = BySimilarUsersSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = BySimilarUsers.objects.all()
        movie = self.request.query_params.get('movie', None)
        if movie is not None:
            subquery = BySimilarUsers.objects.values('user').filter(movie=movie, rating__gte=6)
            queryset = queryset.filter(user__in=Subquery(subquery)).exclude(movie=movie)
        else:
            raise ValidationError()
        queryset = queryset.extra(order_by=['-rating'])
        return queryset
