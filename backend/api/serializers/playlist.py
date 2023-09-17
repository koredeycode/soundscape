# serializers.py
from api.models import Playlist, UserPlaylist, SitePlaylist
from api.serializers.track import TrackSerializer
from api.serializers.user import UserSerializer


class PlaylistSerializer:
    def __init__(self, instance=None, data=None):
        self.instance = instance
        self.validated_data = data
        self.errors = {}
        self.required_fields = ['title']

    def is_valid(self):
        if not self.validated_data:
            # If there is no data provided, consider it invalid
            self.errors['non_field_errors'] = ['No data provided.']
            return False

        # Check if required fields are present
        for field in self.required_fields:
            if field not in self.validated_data:
                self.errors[field] = ['This field is required.']

        if 'title' in self.validated_data and not self.validated_data['title'].strip():
            self.errors['title'] = [
                'Title must not be empty or contain only whitespace characters.']

        # Custom validation checks can be added here

        return not bool(self.errors)

    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = Playlist(**self.validated_data)
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
        # Serialize the instance to a dictionarys
        serialized_data = {
            'id': str(self.instance.id),
            'title': str(self.instance.title),
            'description': str(self.instance.description),
            'tracks': [TrackSerializer(track).data for track in self.instance.tracks.all()],
        }
        # if hasattr(self.instance, 'userplaylist'):
        #     serialized_data['user'] = str(self.instance.userplaylist.user.id)
        # if hasattr(self.instance, 'siteplaylist'):
        #     serialized_data['isPublic'] = self.instance.siteplaylist.isPublic
        return serialized_data


class UserPlaylistSerializer(PlaylistSerializer):
    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = UserPlaylist(**self.validated_data)
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
        serialized_data = super().data
        serialized_data['user'] = UserSerializer(self.instance.user).data
        return serialized_data


class SitePlaylistSerializer(PlaylistSerializer):
    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = SitePlaylist(**self.validated_data)
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
        serialized_data = super().data
        serialized_data['isPublic'] = self.instance.isPublic
        return serialized_data
