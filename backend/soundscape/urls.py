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
from django.contrib import admin
from django.urls import path
from api.views import custom_404_view
from api.auth.views import LoginView, LogoutView, RegisterView, GetMeView
from api.views import GenreView, SitePlaylistView, UserPlaylistView, TrackView

authpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', GetMeView.as_view(), name='get-me'),
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
]

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += authpatterns
urlpatterns += api_patterns

handler404 = custom_404_view
