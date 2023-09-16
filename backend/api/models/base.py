from django.db import models
from django_extensions.db.models import TimeStampedModel
from django_extensions.db.fields import AutoSlugField

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


class TitleSlugDescriptionModel(models.Model):
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    slug = AutoSlugField(populate_from='title')

    class Meta:
        abstract = True
