from django.views import View
from django.http import JsonResponse
# import json
from api.models import Track, SingleTrack
from api.serializers import TrackSerializer, SingleTrackSerializer
from django.utils.decorators import method_decorator
from api.auth import user_required, artist_required


class TrackView(View):
    @method_decorator(user_required)
    def get(self, request, id):
        """
        tracks/id
        """
        track = self.get_track(id=id)
        if track:
            return JsonResponse(TrackSerializer(track).data)
        return JsonResponse({"error": "Track not found"}, status=404)

    @method_decorator(artist_required)
    def post(self, request):
        """
        tracks/
        """
        # print(request.POST.get('title'))
        print(request.FILES)
        audio = request.FILES.get('audio_file')
        image = request.FILES.get('cover_image')
        data = request.POST.dict()
        print(request.POST)
        data['artist_id'] = request.user.artist.id
        data['audio_file'] = audio
        data['cover_image'] = image
        print(data)
        serializer = SingleTrackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            if serializer.errors:
                return JsonResponse(serializer.errors, status=400)
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

    @method_decorator(artist_required)
    def put(self, request, id):
        """
        tracks/id
        """
        track = self.get_singletrack(id=id)
        if track:
            if track.artist.id != request.user.artist.id:
                return JsonResponse({"error": "You don't have permission to edit this track"}, status=403)
            data = self.parse_request_data(request)
            serializer = SingleTrackSerializer(instance=track, data=data)
            if serializer.is_valid():
                serializer.save()
                if serializer.errors:
                    return JsonResponse(serializer.errors, status=400)
                return JsonResponse(serializer.data, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        return JsonResponse({"error": "Track not found"}, status=404)

    @method_decorator(artist_required)
    def delete(self, request, id):
        """
        tracks/id
        """
        track = self.get_singletrack(id=id)
        if track:
            if track.artist.id != request.user.artist.id:
                return JsonResponse({"error": "You don't have permission to delete this track"}, status=403)
            track.delete()
            return JsonResponse({}, status=204)
        return JsonResponse({"error": "Track not found"}, status=404)

    # def parse_request_data(self, request):
    #     # Helper function to parse request data (e.g., JSON) and return a dictionary
    #     # try:
    #     #     return json.loads(request.body.decode('utf-8'))
    #     # except json.JSONDecodeError:
    #     #     return {}
    #     print(dir(request.POST))
    #     return request.POST.dict()

    def get_track(self, id):
        # Helper function to get an instance of Track by ID
        try:
            return Track.objects.get(id=id)
        except Exception as e:
            return None

    def get_singletrack(self, id):
        # Helper function to get an instance of Track by ID
        try:
            return SingleTrack.objects.get(id=id)
        except Exception as e:
            return None
