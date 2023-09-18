from django.views import View
from django.http import FileResponse
from api.models import Track, SingleTrack, Album
from django.utils.decorators import method_decorator
from api.auth.session_auth.decorators import user_required


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
