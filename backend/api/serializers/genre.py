# serializers.py
from api.models import Genre


class GenreSerializer:
    def __init__(self, instance=None, data=None):
        self.instance = instance
        self.validated_data = data
        self.errors = {}

    def is_valid(self):
        # Implement your validation logic here
        # For simplicity, assume it's always valid
        return True

    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = Genre(**self.validated_data)
                self.instance.save()
            else:
                # Update existing track instance

                for attr, value in self.validated_data.items():
                    setattr(self.instance, attr, value)
                self.instance.save()
            return self.instance
        except Exception as e:
            self.errors = {'error': str(e)}

    @property
    def data(self):
        # Serialize the instance to a dictionary
        serialized_data = {
            'id': str(self.instance.id),
            'name': str(self.instance.name),
        }
        return serialized_data
