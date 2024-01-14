# Generated by Django 5.0 on 2024-01-13 18:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MBmovies', '0005_movie_type_m_movie_type'),
        ('MBtheatersAndBooking', '0017_remove_showtime_m_m_language_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='showtime_m',
            name='M_Language',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='MBmovies.movie_language_m'),
        ),
        migrations.AddField(
            model_name='showtime_m',
            name='M_Type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='MBmovies.movie_type_m'),
        ),
    ]
