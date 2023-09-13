from django_extensions.db.models import TitleDescriptionModel
from .base import Base
from django.db import models


class Album(Base, TitleDescriptionModel):
    """
    Model representing a music album.

    Attributes:
        title (str): The title of the album.
        artist (Artist): A reference to the primary artist of the album.
        featured_artists (ManyToManyField): A many-to-many relationship with Artist model for featured artists.
        release_date (date): The release date of the album.
        cover_image (ImageField): An uploaded image file for the album's cover.
    """
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE)
    featured_artists = models.ManyToManyField(
        'Artist', related_name='album_featured_artist', blank=True)
    release_date = models.DateField()
    cover_image = models.ImageField(upload_to='images/albums/')

    def __str__(self):
        return self.title
