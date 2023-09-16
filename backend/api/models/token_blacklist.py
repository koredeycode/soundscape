from .base import Base
from django.db import models


class TokenBlacklist(Base):
    token = models.TextField(unique=True)

    def __str__(self):
        return str(self.token)
