from django.views import View
from django.http import JsonResponse
import json
from api.models import Artist, Track, Album
from api.serializers import ArtistSerializer, TrackSerializer, AlbumSerializer
from django.utils.decorators import method_decorator
from api.auth import user_required


class SearchView(View):
    @method_decorator(user_required)
    def post(self, request, id=None):
        """
        search/
        """
        data = self.parse_request_data(request)
        query = data.get('search')
        if not query:
            return JsonResponse({'error': "Enter a search term"}, status=400)
        artists = [ArtistSerializer(
            artist).data for artist in Artist.objects.filter(name__icontains=query)]
        albums = [AlbumSerializer(album).data for album in Album.objects.filter(
            title__icontains=query)]
        tracks = [TrackSerializer(
            track).data for track in Track.objects.filter(title__icontains=query)]
        return JsonResponse({'artists': artists, 'albums': albums, 'tracks': tracks})

    def parse_request_data(self, request):
        # Helper function to parse request data (e.g., JSON) and return a dictionary
        try:
            return json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return {}
