from django.views import View
from django.http import JsonResponse
import json
from api.models import Genre
from api.serializers import GenreSerializer
from django.utils.decorators import method_decorator
from api.auth.decorators import admin_required, artist_required


class GenreView(View):
    # @method_decorator(artist_required)
    def get(self, request, id=None):
        """
        genres/
        genres/id
        """
        if id:
            genre = self.get_genre(id=id)
            if genre:
                return JsonResponse(GenreSerializer(genre).data)
            return JsonResponse({"error": "Genre not found"}, status=404)
        else:
            genres = self.get_genres()
            return JsonResponse([GenreSerializer(genre).data for genre in genres], safe=False)

    @method_decorator(admin_required)
    def post(self, request, id=None):
        """
        genres/
        """
        data = self.parse_request_data(request)
        serializer = GenreSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            if serializer.errors:
                return JsonResponse(serializer.errors, status=400)
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)

    @method_decorator(admin_required)
    def put(self, request, id):
        """
        genres/id
        """
        genre = self.get_genre(id=id)
        if genre:
            data = self.parse_request_data(request)
            serializer = GenreSerializer(instance=genre, data=data)
            if serializer.is_valid():
                serializer.save()
                if serializer.errors:
                    return JsonResponse(serializer.errors, status=400)
                return JsonResponse(serializer.data, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        return JsonResponse({"error": "Genre not found"}, status=404)

    @method_decorator(admin_required)
    def delete(self, request, id):
        """
        genres/id
        """
        genre = self.get_genre(id=id)
        if genre:
            genre.delete()
            return JsonResponse({}, status=204)
        return JsonResponse({"error": "Genre not found"}, status=404)

    def parse_request_data(self, request):
        # Helper function to parse request data (e.g., JSON) and return a dictionary
        try:
            return json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return {}

    def get_genre(self, id):
        # Helper function to get an instance of Genre by ID
        try:
            return Genre.objects.get(id=id)
        except Exception as e:
            return None

    def get_genres(self):
        try:
            return Genre.objects.all()
        except Exception as e:
            return []
