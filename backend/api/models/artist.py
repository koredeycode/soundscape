from .storage import UUIDStorage
from .base import Base
from django.db import models


class Artist(Base):
    """
    Model representing a music artist.

    Attributes:
        name (str): The name of the artist.
        bio (str): A textual biography or description of the artist.
        user (User): A reference to the user account associated with the artist.
    """
    name = models.CharField(max_length=255, blank=False, unique=True)
    bio = models.TextField(blank=True)
    user = models.OneToOneField('User', on_delete=models.CASCADE)
    profile_image = models.ImageField(
        upload_to='images/profiles/', default='/images/profiles/default.jpg', storage=UUIDStorage())

    def __str__(self):
        return self.name
