from rest_framework import serializers
from .models import Movies


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = ('id', 'title', 'description', 'release_date', 'genre', 'created_at', 'updated_at')
