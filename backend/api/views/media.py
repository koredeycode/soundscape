from django.views import View
from django.http import FileResponse, JsonResponse
from api.models import Track, SingleTrack, Album, Artist
from django.utils.decorators import method_decorator
from api.auth import user_required


class TrackMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/tracks/id
        """
        try:
            track = Track.objects.get(id=id)
            response = FileResponse(track.audio_file, content_type='audio/mp3')
            response['Content-Range'] = 'bytes 0-%s/%s' % (
                track.audio_file.size - 1, track.audio_file.size)
            response['Accept-Ranges'] = 'bytes'
            return response
        except Track.DoesNotExist:
            return JsonResponse({'error': 'File not found'})


class TrackCoverMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/images/tracks/id
        """
        try:
            track = Track.objects.get(id=id)
            return FileResponse(track.image_file)
        except Track.DoesNotExist:
            return JsonResponse({'error': 'File not found'})


class AlbumCoverMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/images/albums/id
        """
        try:
            album = Album.objects.get(id=id)
            return FileResponse(album.cover_image)
        except Album.DoesNotExist:
            return JsonResponse({'error': 'File not found'})


class ArtistProfileMediaView(View):
    # @method_decorator(user_required)
    def get(self, request, id=None):
        """
        media/images/artist/id
        """
        try:
            artist = Artist.objects.get(id=id)
            return FileResponse(artist.profile_image)
        except Artist.DoesNotExist:
            return JsonResponse({'error': 'File not found'})
