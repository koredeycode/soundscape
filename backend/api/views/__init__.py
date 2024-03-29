from django.http import JsonResponse
from .genre import GenreView
from .site_playlist import SitePlaylistView
from .user_playlist import UserPlaylistView
from .track import TrackView
from .albumtrack import AlbumTrackView
from .album import AlbumView
from .artist import ArtistView
from .media import TrackCoverMediaView, AlbumCoverMediaView, TrackMediaView, ArtistProfileMediaView
from .search import SearchView
from .status import StatusView
from .genretrack import *

def custom_404_view(request, exception=None):
    return JsonResponse({"error": "Resource not found"}, status=404)
