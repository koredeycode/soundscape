from .base import Base, TitleSlugDescriptionModel
from django.db import models
from .storage import UUIDStorage
from datetime import datetime


class Track(Base, TitleSlugDescriptionModel):
    """
    Model representing a music track.

    Attributes:
        title (str): The title of the track.
        artist (Artist): A reference to the main artist of the track.
        featured_artists (ManyToManyField): A many-to-many relationship with Artist model for featured artists.
        release_date (date): The release date of the track.
        duration (int): The duration of the track in seconds.
        streams (int): The stream number of the track.
        genre (Genre): A reference to the genre of the track.
        audio_file (FileField): An uploaded audio file for the track.
    """
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE)
    featured_artists = models.ManyToManyField(
        'Artist', related_name='track_featured_artist', blank=True)
    release_date = models.DateField(default=datetime.now)
    # duration = models.PositiveIntegerField()  # Duration in seconds
    streams = models.PositiveIntegerField(default=0)
    genre = models.ForeignKey('Genre', on_delete=models.CASCADE)
    audio_file = models.FileField(
        upload_to='files/tracks/', storage=UUIDStorage())

    def __str__(self):
        return self.title

    @property
    def image_file(self):
        if hasattr(self, 'singletrack'):
            return self.singletrack.cover_image
        return self.albumtrack.album.cover_image


class SingleTrack(Track):
    """
    Model representing a single music track.

    Attributes:
        cover_image (ImageField): An uploaded image file representing the track's cover.
    """
    cover_image = models.ImageField(
        upload_to='images/tracks/', default='images/tracks/default.jpg', storage=UUIDStorage())


class AlbumTrack(Track):
    """
    Model representing a track that belongs to an album.

    Attributes:
        album (Album): A reference to the album to which the track belongs.
    """
    album = models.ForeignKey('Album', on_delete=models.CASCADE)
