from .base import Base
from django.db import models


class Genre(Base):
    """
    Model representing a music genre.

    Attributes:
        name (str): The name of the music genre.
    """
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
