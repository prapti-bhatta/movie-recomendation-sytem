from rest_framework import serializers
from .models import Movies


class MovieSerializer(serializers.ModelSerializer):
    genre = serializers.SlugRelatedField(read_only=True, slug_field='name')
    class Meta:
        model = Movies
        fields = ('id', 'title', 'description', 'release_date', 'genre', 'created_at', 'updated_at')
