# Generated by Django 5.0 on 2024-01-09 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MBtheatersAndBooking', '0003_payment_mode_rename_seat_no_seat_m_seat_row_alphabet_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='screen_m',
            name='Screen_Name',
            field=models.CharField(default='Screen X', max_length=50),
        ),
    ]
