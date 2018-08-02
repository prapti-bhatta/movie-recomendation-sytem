from django.db import models
from django.contrib.auth.models import User
from movies.models import Movies


class BySimilarUsers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, null=False)
    rating = models.FloatField(null=False)

    class Meta:
        unique_together = ('user', 'movie')
