# Generated by Django 2.0.6 on 2018-07-12 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_auto_20180712_1018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movies',
            name='genre',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='genre.Genre'),
        ),
        migrations.DeleteModel(
            name='Genre',
        ),
    ]
