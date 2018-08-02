from rest_framework import viewsets
from .models import Movies, MovieReviews
from .serializers import MovieSerializer, MovieReviewSerializer
from rest_framework.pagination import LimitOffsetPagination


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movies.objects.all()
    serializer_class = MovieSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = Movies.objects.all()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(title__icontains=search)
        return queryset


class MovieReviewViewSet(viewsets.ModelViewSet):
    queryset = MovieReviews.objects.all()
    serializer_class = MovieReviewSerializer

    def get_queryset(self):
        queryset = MovieReviews.objects.all()
        movie = self.request.query_params.get('movie', None)
        user = self.request.query_params.get('user', None)
        if movie is not None:
            queryset = queryset.filter(movie = movie)
        if user is not None:
            queryset = queryset.filter(user = user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
