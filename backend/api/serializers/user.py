# serializers.py
from api.models import User


class UserSerializer:
    def __init__(self, instance=None, data=None):
        self.instance = instance
        self.validated_data = data
        self.errors = {}
        self.required_fields = ['username', 'email', 'password']

    def is_valid(self):
        if not self.validated_data:
            # If there is no data provided, consider it invalid
            self.errors['non_field_errors'] = ['No data provided.']
            return False

        # Check if required fields are present
        for field in self.required_fields:
            if field not in self.validated_data:
                self.errors[field] = ['This field is required.']

        # Custom validation checks can be added here

        return not bool(self.errors)

    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = User(**self.validated_data)
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
            'username': str(self.instance.username),
            'first_name': str(self.instance.first_name),
            'last_name': str(self.instance.last_name),
        }
        return serialized_data
