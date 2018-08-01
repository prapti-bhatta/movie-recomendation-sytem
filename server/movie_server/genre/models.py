from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=255, null=False)
    description = models.CharField(max_length=65535, blank=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name
