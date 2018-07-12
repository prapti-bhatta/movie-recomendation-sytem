from rest_framework import serializers
from .models import Movies, Genre


class MovieSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Movies
        fields = ('id', 'title', 'description', 'release_date', 'genre', 'created_at', 'updated_at')


class GenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name', 'description')
