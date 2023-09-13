from .base import Base
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser


class User(Base, AbstractBaseUser):
    """
    Model representing a user account.

    Attributes:
        username (str): The unique username of the user.
        email (str): The unique email address of the user.
        password (str): The hashed password of the user.
    """
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=True)
    username = models.CharField(max_length=100, unique=True, blank=False)
    email = models.EmailField(unique=True, blank=False)

    def __str__(self):
        return self.username

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name
