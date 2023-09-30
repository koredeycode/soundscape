"""soundscape URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from api.auth import LoginView, LogoutView, ProfileView, GetUserView, GetArtistView
# from api.auth import GetArtistView, LoginView, LogoutView, ProfileView, GetUserView
from api.views import (GenreView, SitePlaylistView, UserPlaylistView, TrackView,
                       AlbumView, ArtistView, TrackMediaView, TrackCoverMediaView,
                       AlbumCoverMediaView, ArtistProfileMediaView, SearchView,
                       StatusView, AlbumTrackView)

authpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('isuser/', GetUserView.as_view(), name='get-user'),
    path('isartist/', GetArtistView.as_view(), name='get-artist')
]

api_patterns = [
    path('genres/', GenreView.as_view(), name='genres'),
    path('genres/<uuid:id>/', GenreView.as_view(), name='genre'),
    path('site_playlists/', SitePlaylistView.as_view(), name='site-playlists'),
    path('site_playlists/<uuid:id>/',
         SitePlaylistView.as_view(), name='site-playlist'),
    path('user_playlists/', UserPlaylistView.as_view(), name='user-playlists'),
    path('user_playlists/<uuid:id>/',
         UserPlaylistView.as_view(), name='user-playlist'),
    path('tracks/', TrackView.as_view(), name='tracks'),
    path('tracks/<uuid:id>/', TrackView.as_view(), name='track'),
    path('albums/', AlbumView.as_view(), name='albums'),
    path('albums/<uuid:id>/', AlbumView.as_view(), name='album'),
    path('albums/<uuid:album_id>/tracks/',
         AlbumTrackView.as_view(), name='album-track'),
    path('albums/<uuid:album_id>/tracks/<uuid:id>/',
         AlbumTrackView.as_view(), name='album-track'),
    path('artists/<uuid:id>/', ArtistView.as_view(), name='artist'),
    path('media/tracks/<uuid:id>', TrackMediaView.as_view(), name='track-media'),
    path('media/images/tracks/<uuid:id>/',
         TrackCoverMediaView.as_view(), name='track-cover-media'),
    path('media/images/albums/<uuid:id>/', AlbumCoverMediaView.as_view(),
         name='album-cover-media'),
    path('media/images/artists/<uuid:id>/',
         ArtistProfileMediaView.as_view(), name='artist-profile-media'),
    path('search/', SearchView.as_view(), name='search'),
    path('status/', StatusView.as_view(), name="status")
]

urlpatterns = []

urlpatterns += authpatterns
urlpatterns += api_patterns
