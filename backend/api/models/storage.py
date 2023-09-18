import os
import uuid
from django.core.files.storage import FileSystemStorage


class UUIDStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        """
        Returns a filename that's free on the target storage system, and
        available for new content to be written to.
        """
        dir, filename = os.path.split(name)
        _, ext = os.path.splitext(filename)
        unique_name = f"{dir}/{str(uuid.uuid4())}{ext}"
        return super().get_available_name(unique_name, max_length)
