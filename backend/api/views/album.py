from django.views import View
from django.http import JsonResponse
import json
from api.models import Album
from api.serializers import AlbumSerializer
from django.utils.decorators import method_decorator
from api.auth.decorators import user_required, artist_required


class AlbumView(View):
    @method_decorator(user_required)
    def get(self, request, id):
        """
        albums/id
        """
        album = self.get_album(id=id)
        if album:
            return JsonResponse(AlbumSerializer(album).data)
        return JsonResponse({"error": "Album not found"}, status=404)

    @method_decorator(artist_required)
    def post(self, request):
        """
        albums/
        """
        data = self.parse_request_data(request)
        data['artist_id'] = request.user.artist.id
        serializer = AlbumSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            if serializer.errors:
                return JsonResponse(serializer.errors, status=400)
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)

    @method_decorator(artist_required)
    def put(self, request, id):
        """
        albums/id
        """
        album = self.get_album(id=id)
        if album:
            if album.artist.id != request.user.artist.id:
                return JsonResponse({"error": "You don't have permission to delete this album"}, status=403)
            data = self.parse_request_data(request)
            serializer = AlbumSerializer(instance=album, data=data)
            if serializer.is_valid():
                serializer.save()
                if serializer.errors:
                    return JsonResponse(serializer.errors, status=400)
                return JsonResponse(serializer.data, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        return JsonResponse({"error": "Album not found"}, status=404)

    @method_decorator(artist_required)
    def delete(self, request, id):
        """
        albums/id
        """
        album = self.get_album(id=id)
        if album:
            if album.artist.id != request.user.artist.id:
                return JsonResponse({"error": "You don't have permission to delete this album"}, status=403)
            album.delete()
            return JsonResponse({}, status=204)
        return JsonResponse({"error": "Album not found"}, status=404)

    def parse_request_data(self, request):
        # Helper function to parse request data (e.g., JSON) and return a dictionary
        try:
            return json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return {}

    def get_album(self, id):
        # Helper function to get an instance of Album by ID
        try:
            return Album.objects.get(id=id)
        except Exception as e:
            return None
