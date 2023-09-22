# serializers.py
from api.models import Track, SingleTrack
from api.serializers.artist import ArtistSerializer
from api.serializers.genre import GenreSerializer

from django.conf import settings

BASE_URL = settings.BASE_URL


class TrackSerializer:
    def __init__(self, instance=None, data=None, fields_to_include=None):
        self.instance = instance
        self.validated_data = data
        self.errors = {}
        self.required_fields = [
            'title', 'artist_id', 'release_date', 'genre_id']
        self.fields_to_include = fields_to_include

    def is_valid(self):
        if not self.validated_data:
            # If there is no data provided, consider it invalid
            self.errors['non_field_errors'] = ['No data provided.']
            return False

        # Check if required fields are present
        for field in self.required_fields:
            if field not in self.validated_data:
                self.errors[field] = ['This field is required.']

        # if self.validated_data.get('duration', 0) <= 0:
        #     self.errors['duration'] = ['Duration must be a positive integer.']

        if 'release_date' in self.validated_data and not isinstance(self.validated_data['release_date'], str):
            self.errors['release_date'] = [
                'Release date must be a valid date string.']
        return True

    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = Track(**self.validated_data)
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
            'title': str(self.instance.title),
            'slug': str(self.instance.slug),
            'description': str(self.instance.description),
            'artist': ArtistSerializer(self.instance.artist).data,
            'genre': GenreSerializer(self.instance.genre).data,
            'duration': self.instance.duration,
            'streams': self.instance.streams,
            'release_date': str(self.instance.release_date),
            'cover_image': f'{BASE_URL}/media/images/tracks/{str(self.instance.id)}',
            'audio_file': f'{BASE_URL}/media/tracks/{str(self.instance.id)}',
            'featured_artists': [ArtistSerializer(artist).data for artist in self.instance.featured_artists.all()]
        }

        if hasattr(self.instance, 'albumtrack'):
            serialized_data['album_id'] = str(
                self.instance.albumtrack.album_id)
        if self.fields_to_include:
            filtered_data = {field: serialized_data[field]
                             for field in self.fields_to_include}
            return filtered_data
        return serialized_data


class SingleTrackSerializer(TrackSerializer):
    def save(self):
        try:
            if self.instance is None:
                # Create a new track instance if it doesn't exist
                self.instance = SingleTrack(**self.validated_data)
                self.instance.save()
            else:
                # Update existing track instance
                for attr, value in self.validated_data.items():
                    setattr(self.instance, attr, value)
                self.instance.save()
            return self.instance
        except Exception as e:
            self.errors = {'error': str(e)}
