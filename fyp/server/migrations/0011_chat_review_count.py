# Generated by Django 4.0 on 2023-02-27 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0010_chat_interested'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='review_count',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]