from rest_framework import serializers
from .models import Movies


class MovieSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Movies
        fields = ('title', 'description', 'release_date', 'genre', 'created_at', 'updated_at')
