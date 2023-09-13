from django_extensions.db.models import TitleDescriptionModel
from .base import Base
from django.db import models


class Playlist(Base, TitleDescriptionModel):
    """
    Model representing a playlist of music tracks.

    Attributes:
        tracks (ManyToManyField): A many-to-many relationship with Track model for the playlist's tracks.
    """
    tracks = models.ManyToManyField('Track', related_name='playlists')

    def __str__(self):
        return self.title


class UserPlaylist(Playlist):
    """
    Model representing a user-created playlist.

    Attributes:
        user (User): A reference to the user who created the playlist.
    """
    user = models.ForeignKey(
        'User', related_name='playlists',  on_delete=models.CASCADE)


class SitePlaylist(Playlist):
    """
    Model representing a user-created playlist.

    Attributes:
        isPublic (BooleanField): A field to display if the playlist is public.
    """
    isPublic = models.BooleanField(default=False)
