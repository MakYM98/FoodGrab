# Generated by Django 4.0 on 2023-02-27 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0011_chat_review_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='review_count',
        ),
        migrations.AddField(
            model_name='chat',
            name='buyer_reviewed',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='chat',
            name='seller_reviewed',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
