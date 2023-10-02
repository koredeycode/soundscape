from django.views import View
from django.http import JsonResponse
import json
from api.models import Genre, Track
from api.serializers import GenreSerializer, TrackSerializer
from django.utils.decorators import method_decorator
from api.auth import user_required, admin_required


class GenreTrackView(View):
    @method_decorator(user_required)
    def get(self, request, id=None):
        """
        genres/
        genres/id/tracks
        """
        genre = Genre.objects.get(id=id)
        # tracks = [TrackSerializer(
        #     track).data for track in Track.objects.get(genre_id=id)]
        return JsonResponse(GenreSerializer(genre, full=True).data, safe=False)
