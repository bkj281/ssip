# Generated by Django 3.2.6 on 2022-10-05 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0002_auto_20221004_1953'),
    ]

    operations = [
        migrations.AlterField(
            model_name='responsemodel',
            name='station_id',
            field=models.CharField(max_length=10),
        ),
    ]
