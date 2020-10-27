# Generated by Django 2.2 on 2020-10-27 14:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0006_auto_20201027_2341'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='rname_tweet_user', through='tweets.TweetLike', to=settings.AUTH_USER_MODEL),
        ),
    ]
