from django.views import View
from django.http import JsonResponse
import json
from api.models import UserPlaylist
from api.serializers import UserPlaylistSerializer
from django.utils.decorators import method_decorator
from api.auth import user_required, artist_required


class UserPlaylistView(View):
    @method_decorator(user_required)
    def get(self, request, id=None):
        """
        user_playlists/
        user_playlists/id
        """
        if id:
            playlist = self.get_playlist(id=id, user=request.user)
            if playlist:
                return JsonResponse(UserPlaylistSerializer(playlist).data)
            return JsonResponse({"error": "Playlist not found"}, status=404)
        else:
            playlists = self.get_playlists(user=request.user)
            return JsonResponse([UserPlaylistSerializer(playlist).data for playlist in playlists], safe=False)

    @method_decorator(user_required)
    def post(self, request, id=None):
        """
        user_playlists/
        """
        data = self.parse_request_data(request)
        data['user_id'] = request.user.id
        serializer = UserPlaylistSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            if serializer.errors:
                return JsonResponse(serializer.errors, status=400)
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)

    @method_decorator(user_required)
    def put(self, request, id):
        """
        /userplaylists/id
        """
        playlist = self.get_playlist(id=id, user=request.user)
        if playlist:
            data = self.parse_request_data(request)
            serializer = UserPlaylistSerializer(instance=playlist, data=data)
            if serializer.is_valid():
                serializer.save()
                if serializer.errors:
                    return JsonResponse(serializer.errors, status=400)
                return JsonResponse(serializer.data, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        return JsonResponse({"error": "Playlist not found"}, status=404)

    @method_decorator(user_required)
    def delete(self, request, id):
        """
        /userplaylists/id
        """
        playlist = self.get_playlist(id=id, user=request.user)
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

    def get_playlist(self, user, id):
        # Helper function to get an instance of UserPlaylist by ID
        try:
            return UserPlaylist.objects.get(id=id, user=user)
        except Exception as e:
            return None

    def get_playlists(self, user):
        try:
            return UserPlaylist.objects.filter(user=user)
        except Exception as e:
            return []
