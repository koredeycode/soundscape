from django.db import models
from django_extensions.db.models import TimeStampedModel
import uuid


class Base(TimeStampedModel, models.Model):
    """
    Abstract base model providing common fields and methods for other models.

    Attributes:
        id (UUID): A universally unique identifier (UUID) serving as the primary key.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True
