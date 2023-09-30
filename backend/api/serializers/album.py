# serializers.py
from api.models import Album
from api.serializers.artist import ArtistSerializer
from api.serializers.track import TrackSerializer
from django.conf import settings

BASE_URL = settings.BASE_URL


class AlbumSerializer:
    def __init__(self, instance=None, data=None):
        self.instance = instance
        self.validated_data = data
        self.errors = {}
        self.required_fields = ['title', 'artist_id']

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
                self.instance = Album(**self.validated_data)
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
            'description': str(self.instance.description or ''),
            'artist': ArtistSerializer(self.instance.artist).data,
            # 'total_duration': str(sum([track.duration for track in self.instance.albumtrack_set.all()])),
            'tracks': [TrackSerializer(track).data for track in self.instance.albumtrack_set.all()],
            'cover_image': f'{BASE_URL}/media/images/albums/{str(self.instance.id)}',
            'release_date': str(self.instance.release_date),
            'featured_artists': [ArtistSerializer(artist).data for artist in self.instance.featured_artists.all()]
        }
        return serialized_data
