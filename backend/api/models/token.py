from .base import Base
from django.db import models


class AuthToken(Base):
    user = models.ForeignKey('User', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)
