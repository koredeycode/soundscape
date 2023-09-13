# serializers.py
from api.models import Track
from api.serializers.artist import ArtistSerializer
from api.serializers.genre import GenreSerializer


class TrackSerializer:
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
            'description': str(self.instance.description),
            'artist': ArtistSerializer(self.instance.artist).data,
            'genre': GenreSerializer(self.instance.genre).data,
            'duration': self.instance.duration,
            'streams': self.instance.streams,
            'release_date': str(self.instance.release_date),
            'featured_artists': [ArtistSerializer(artist).data for artist in self.instance.featured_artists.all()]
        }

        if hasattr(self.instance, 'albumtrack'):
            serialized_data['album_id'] = str(
                self.instance.albumtrack.album_id)
        return serialized_data
