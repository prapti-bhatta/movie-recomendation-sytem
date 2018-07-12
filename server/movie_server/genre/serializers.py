from rest_framework import serializers
from .models import Genre


class GenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name', 'description')
