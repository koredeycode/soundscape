# Generated by Django 4.2.5 on 2023-09-28 23:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_album_cover_image_alter_artist_profile_image_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='duration',
        ),
    ]
