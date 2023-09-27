# Generated by Django 4.1.3 on 2023-09-18 22:14

import api.models.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_artist_profile_image_alter_album_cover_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='singletrack',
            name='cover_image',
            field=models.ImageField(storage=api.models.storage.UUIDStorage(), upload_to='images/tracks/'),
        ),
    ]