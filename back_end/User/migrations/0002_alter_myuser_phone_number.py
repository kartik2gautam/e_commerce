# Generated by Django 4.2.6 on 2023-11-06 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='phone_number',
            field=models.BigIntegerField(null=True),
        ),
    ]
