# Generated by Django 4.1.3 on 2023-09-21 18:17

import api.models.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_artist_profile_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='cover_image',
            field=models.ImageField(default='images/albums/default.jpg', storage=api.models.storage.UUIDStorage(), upload_to='images/albums/'),
        ),
        migrations.AlterField(
            model_name='artist',
            name='profile_image',
            field=models.ImageField(default='images/artists/default.jpg', storage=api.models.storage.UUIDStorage(), upload_to='images/artists/'),
        ),
        migrations.AlterField(
            model_name='singletrack',
            name='cover_image',
            field=models.ImageField(default='images/tracks/default.jpg', storage=api.models.storage.UUIDStorage(), upload_to='images/tracks/'),
        ),
    ]
