# Generated by Django 4.1.5 on 2023-02-05 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_alter_user_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='rating',
            field=models.FloatField(null=True),
        ),
    ]
