# serializers.py
from api.models import Artist
from api.serializers.user import UserSerializer


class ArtistSerializer:
    def __init__(self, instance=None, data=None):
        self.instance = instance
        self.validated_data = data
        self.errors = {}
        self.required_fields = ['name', 'user_id']

    def is_valid(self):
        if not self.validated_data:
            # If there is no data provided, consider it invalid
            self.errors['non_field_errors'] = ['No data provided.']
            return False

        # Check if required fields are present
        for field in self.required_fields:
            if field not in self.validated_data:
                self.errors[field] = ['This field is required.']

        if 'name' in self.validated_data and not self.validated_data['name'].strip():
            self.errors['name'] = [
                'Name must not be empty or contain only whitespace characters.']

        # Custom validation checks can be added here

        return not bool(self.errors)

    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = Artist(**self.validated_data)
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
            'bio': str(self.instance.bio),
            'user': UserSerializer(self.instance.user).data
        }
        return serialized_data
