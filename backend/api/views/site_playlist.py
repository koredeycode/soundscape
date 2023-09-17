from django.views import View
from django.http import JsonResponse
import json
from api.models import SitePlaylist
from api.serializers import SitePlaylistSerializer
from django.utils.decorators import method_decorator
from api.auth import user_required, admin_required


class SitePlaylistView(View):
    @method_decorator(user_required)
    def get(self, request, id=None):
        """
        site_playlists/
        site_playlists/id
        """
        if id:
            playlist = self.get_playlist(id=id)
            if playlist:
                return JsonResponse(SitePlaylistSerializer(playlist).data)
            return JsonResponse({"error": "Playlist not found"}, status=404)
        else:
            playlists = self.get_playlists()
            return JsonResponse([SitePlaylistSerializer(playlist).data for playlist in playlists], safe=False)

    @method_decorator(admin_required)
    def post(self, request, id=None):
        """
        site_playlists/
        """
        data = self.parse_request_data(request)
        data['user_id'] = request.user.id
        serializer = SitePlaylistSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            if serializer.errors:
                return JsonResponse(serializer.errors, status=400)
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

    @method_decorator(admin_required)
    def put(self, request, id):
        """
        site_playlists/id
        """
        playlist = self.get_playlist(id=id)
        if playlist:
            data = self.parse_request_data(request)
            serializer = SitePlaylistSerializer(instance=playlist, data=data)
            if serializer.is_valid():
                serializer.save()
                if serializer.errors:
                    return JsonResponse(serializer.errors, status=400)
                return JsonResponse(serializer.data, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        return JsonResponse({"error": "Playlist not found"}, status=404)

    @method_decorator(admin_required)
    def delete(self, request, id):
        """
        site_playlists/id
        """
        playlist = self.get_playlist(id=id)
        if playlist:
            playlist.delete()
            return JsonResponse({}, status=204)
        return JsonResponse({"error": "Playlist not found"}, status=404)

    def parse_request_data(self, request):
        # Helper function to parse request data (e.g., JSON) and return a dictionary
        try:
            return json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return {}

    def get_playlist(self, id):
        # Helper function to get an instance of SitePlaylist by ID
        try:
            return SitePlaylist.objects.get(id=id)
        except Exception as e:
            return None

    def get_playlists(self):
        try:
            return SitePlaylist.objects.filter()
        except Exception as e:
            return []
