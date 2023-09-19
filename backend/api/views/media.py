from django.views import View
from django.http import FileResponse
from api.models import Track, SingleTrack, Album, Artist
from django.utils.decorators import method_decorator
from api.auth import user_required


class TrackMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/tracks/id
        """
        track = Track.objects.get(id=id)
        return FileResponse(track.audio_file)


class TrackCoverMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/images/track/id
        """
        track = Track.objects.get(id=id)
        return FileResponse(track.image_file)


class AlbumCoverMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/images/album/id
        """
        album = Album.objects.get(id=id)
        return FileResponse(album.cover_image)


class ArtistProfileMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/images/artist/id
        """
        artist = Artist.objects.get(id=id)
        return FileResponse(artist.profile_image)
