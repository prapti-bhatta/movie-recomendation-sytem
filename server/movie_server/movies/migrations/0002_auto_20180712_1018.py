# Generated by Django 2.0.6 on 2018-07-12 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movies',
            name='release_date',
            field=models.DateField(),
        ),
    ]