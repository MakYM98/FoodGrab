# Generated by Django 4.0 on 2023-02-26 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0008_alter_messages_date_sent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='image',
            field=models.ImageField(upload_to='post_images'),
        ),
    ]
