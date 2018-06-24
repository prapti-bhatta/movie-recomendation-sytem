from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    email = models.EmailField(unique=True, null=False)
    user_type = models.IntegerField(default=0)
    password_hash = models.CharField(max_length=64, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Genre(models.Model):
    name = models.CharField(max_length=255, null=False)
    description = models.CharField(max_length=65535)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Movies(models.Model):
    title = models.CharField(max_length=255, null=False)
    description = models.CharField(max_length=65535)
    release_date = models.DateTimeField()
    genre = models.ForeignKey(Genre, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MovieReviews(models.Model):
    comment = models.CharField(max_length=65535)
    rating = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=False)
    movie = models.ForeignKey(Movies, on_delete=models.PROTECT, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'movie')