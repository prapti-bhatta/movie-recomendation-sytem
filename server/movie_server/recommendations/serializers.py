from rest_framework import serializers
from .models import BySimilarUsers
from movies.serializers import MovieSerializer


class BySimilarUsersSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)

    class Meta:
        model = BySimilarUsers
        fields = ('id', 'user', 'movie')
