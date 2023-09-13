import os
import django
import random

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "soundscape.settings")
django.setup()
if True:
    from api.models import Album, Artist, Genre, Playlist, User, SingleTrack, AlbumTrack, UserPlaylist, SitePlaylist
# Import your models

# Create genres
genre1 = Genre.objects.create(name="Genre 1")
genre2 = Genre.objects.create(name="Genre 2")

# Create users
user1 = User.objects.create(
    username="user1", email="user1@example.com", first_name="John")
user2 = User.objects.create(
    username="user2", email="user2@example.com", first_name="Jane")
user3 = User.objects.create(
    username="user3", email="user3@example.com", first_name="Jack")

for user in User.objects.all():
    user.set_password(user.username)
    user.save()

# Create artists and link them to users
artist1 = Artist.objects.create(
    name="Artist 1", bio="Bio for Artist 1", user=user1)
artist2 = Artist.objects.create(
    name="Artist 2", bio="Bio for Artist 2", user=user2)

# Create single tracks
track1 = SingleTrack.objects.create(
    title="Track 1", artist=artist1, release_date="2023-01-01", duration=180, genre=genre1)
track2 = SingleTrack.objects.create(
    title="Track 2", artist=artist2, release_date="2023-02-01", duration=210, genre=genre2)
track3 = SingleTrack.objects.create(
    title="Track 3", artist=artist1, release_date="2023-03-01", duration=190, genre=genre1)
track4 = SingleTrack.objects.create(
    title="Track 4", artist=artist2, release_date="2023-04-01", duration=220, genre=genre2)
track5 = SingleTrack.objects.create(
    title="Track 5", artist=artist1, release_date="2023-05-01", duration=200, genre=genre1)

# Create albums
album1 = Album.objects.create(
    title="Album 1", artist=artist1, release_date="2023-01-01")
album2 = Album.objects.create(
    title="Album 2", artist=artist2, release_date="2023-02-01")

# Create album tracks and associate them with albums
album_track1 = AlbumTrack.objects.create(
    title="Album Track 1", artist=artist1, release_date="2023-01-01", duration=240, genre=genre1, album=album1)
album_track2 = AlbumTrack.objects.create(
    title="Album Track 2", artist=artist2, release_date="2023-02-01", duration=200, genre=genre2, album=album2)
album_track3 = AlbumTrack.objects.create(
    title="Album Track 3", artist=artist1, release_date="2023-03-01", duration=220, genre=genre1, album=album1)
album_track4 = AlbumTrack.objects.create(
    title="Album Track 4", artist=artist2, release_date="2023-04-01", duration=250, genre=genre2, album=album2)
album_track5 = AlbumTrack.objects.create(
    title="Album Track 5", artist=artist1, release_date="2023-05-01", duration=230, genre=genre1, album=album1)

# Create User and Site playlists
user_playlist = UserPlaylist.objects.create(title="User Playlist", user=user3)
site_playlist = SitePlaylist.objects.create(
    title="Site Playlist", isPublic=True)

# Create a list of all single tracks and album tracks
all_tracks = [track1, track2, track3, track4, track5, album_track1,
              album_track2, album_track3, album_track4, album_track5]

# Randomly assign tracks to the User and Site playlists
random.shuffle(all_tracks)
user_playlist.tracks.set(all_tracks[:3])
site_playlist.tracks.set(all_tracks[3:])

# Output
print("Sample data has been populated in the database.")
