from rest_framework import serializers
from .models import Movies, MovieReviews
from genre.models import Genre
from users.serializers import UserSerializer


class MovieSerializerWithRating(serializers.ModelSerializer):
    genre_name = serializers.StringRelatedField(source='genre', read_only=True)
    genre = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all())
    rating = serializers.FloatField()

    class Meta:
        model = Movies
        fields = ('id', 'title', 'description', 'rating', 'preview', 'release_date', 'genre', 'genre_name', 'created_at', 'updated_at')


class MovieSerializer(serializers.ModelSerializer):
    genre_name = serializers.StringRelatedField(source='genre', read_only=True)
    genre = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all())

    class Meta:
        model = Movies
        fields = ('id', 'title', 'description', 'preview', 'release_date', 'genre', 'genre_name', 'created_at', 'updated_at')


class MovieReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = MovieReviews
        fields = ('id', 'comment', 'rating', 'movie', 'user', 'created_at')
