# Generated by Django 3.2.6 on 2022-10-05 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='responsemodel',
            name='station',
        ),
        migrations.AddField(
            model_name='responsemodel',
            name='station_id',
            field=models.CharField(default='GJ0101', max_length=10),
        ),
    ]
