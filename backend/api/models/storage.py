import os
import uuid
from django.core.files.storage import FileSystemStorage


class UUIDStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        """
        Returns a filename that's free on the target storage system, and
        available for new content to be written to.
        """
        root, ext = os.path.splitext(name)
        unique_name = f"{root}_{str(uuid.uuid4())}{ext}"
        return super().get_available_name(unique_name, max_length)
