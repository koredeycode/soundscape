from django.views import View
from django.http import JsonResponse
import json
from api.models import Album, SingleTrack, Artist
from api.serializers import AlbumSerializer, TrackSerializer, ArtistSerializer
from django.utils.decorators import method_decorator
from api.auth import user_required, artist_required


class ArtistView(View):
    @method_decorator(user_required)
    def get(self, request, id):
        """
        artists/id/
        """
        artist = self.get_artist(artist_id=id)
        if not artist:
            return JsonResponse({"errror": "No artist with that id"}, status=400)
        artist = ArtistSerializer(artist).data
        albums = [AlbumSerializer(
            album).data for album in self.get_albums(artist_id=id)]
        tracks = [TrackSerializer(
            track).data for track in self.get_tracks(artist_id=id)]
        return JsonResponse({"artist": artist, "tracks": tracks, "albums": albums})

    @method_decorator(artist_required)
    def post(self, request, id=None):
        """
        artists/
        artists/id
        """
        data = request.POST.dict()
        image = request.FILES.get('profile_image')
        if image:
            data['profile_image'] = image
        if id:
            artist = request.user.artist
            if artist.id != id:
                return JsonResponse({"error": "You don't have permission to edit this artist profile"}, status=403)
            serializer = ArtistSerializer(instance=artist, data=data)
            serializer.save()
            if serializer.errors:
                return JsonResponse(serializer.errors, status=400)
            return JsonResponse(serializer.data, status=200)
        else:
            serializer = ArtistSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                if serializer.errors:
                    return JsonResponse(serializer.errors, status=400)
                return JsonResponse(serializer.data, status=201)
            else:
                return JsonResponse(serializer.errors, status=400)

    @method_decorator(artist_required)
    def delete(self, request, id):
        """
        artists/id
        """
        artist = request.user.artist
        if artist.id != id:
            return JsonResponse({"error": "You don't have permission to edit this artist profile"}, status=403)
        artist.delete()
        return JsonResponse({}, status=204)

    # def parse_request_data(self, request):
    #     # Helper function to parse request data (e.g., JSON) and return a dictionary
    #     try:
    #         return json.loads(request.body.decode('utf-8'))
    #     except json.JSONDecodeError:
    #         return {}

    def get_albums(self, artist_id):
        # Helper function to get an instance of Album by ID
        try:
            return Album.objects.filter(artist_id=artist_id)
        except Exception as e:
            return []

    def get_tracks(self, artist_id):
        # Helper function to get an instance of Album by ID
        try:
            return SingleTrack.objects.filter(artist_id=artist_id)
        except Exception as e:
            return []

    def get_artist(self, artist_id):
        try:
            return Artist.objects.get(id=artist_id)
        except Exception as e:
            return None
