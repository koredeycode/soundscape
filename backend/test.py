import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'soundscape.settings')

# Set the DJANGO_SETTINGS_MODULE environment variable to your project's settings module.

# Initialize Django
django.setup()

if True:
    from api.models import Track, SingleTrack, AlbumTrack, Album, Playlist, UserPlaylist, User, Artist, Genre

# Now you can interact with your models and the database

# Example: Create a User
user = User.objects.create(
    username='burna', email='burna@outside.com', password='damini123')

user2 = User.objects.create(
    username='tunny', email='tunny@outside.com', password='tunny123')

# Example: Create an Artist
artist = Artist.objects.create(name='Burna', bio='Big 7, elmejor', user=user)

# Example: Create a Genre
genre = Genre.objects.create(name='Afrofusion')

# Example: Create an Album
album = Album.objects.create(title='I Told Them', artist=artist,
                             release_date='2023-01-01', cover_image='path_to_image.jpg')

# Example: Create a Track
# track = Track.objects.create(title='Track Title', artist=artist, release_date='2023-01-01',
#                              duration=240, genre=genre, audio_file='path_to_audio.mp3')

# Example: Create a SingleTrack (inherits from Track)
single_track1 = SingleTrack.objects.create(title='Question', artist=artist, release_date='2023-01-01',
                                           duration=180, genre=genre, audio_file='path_to_single_audio.mp3', cover_image='path_to_single_track_image.jpg')

single_track2 = SingleTrack.objects.create(title='Want It All', artist=artist, release_date='2023-01-01',
                                           duration=180, genre=genre, audio_file='path_to_single_audio.mp3', cover_image='path_to_single_track_image.jpg')

# Example: Create an AlbumTrack (inherits from Track)
album_track1 = AlbumTrack.objects.create(title='Normal', artist=artist, album=album,
                                         release_date='2023-01-01', duration=300, genre=genre, audio_file='path_to_album_audio.mp3')
album_track2 = AlbumTrack.objects.create(title='City Boy', artist=artist, album=album,
                                         release_date='2023-01-01', duration=300, genre=genre, audio_file='path_to_album_audio.mp3')
album_track3 = AlbumTrack.objects.create(title='Giza', artist=artist, album=album,
                                         release_date='2023-01-01', duration=300, genre=genre, audio_file='path_to_album_audio.mp3')
# Example: Create a Playlist
playlist = Playlist.objects.create(title='Top songs')

# Example: Add Tracks to a Playlist
playlist.tracks.add(single_track1, single_track2,
                    album_track1, album_track2, album_track3)

# Example: Create a UserPlaylist (inherits from Playlist)
user_playlist = UserPlaylist.objects.create(title='Tunny Playlist', user=user)

# Example: Add Tracks to a UserPlaylist
user_playlist.tracks.add(single_track1, album_track1, album_track2)


# Example: Querying and displaying data
print(f'Artist Name: {artist.name}')
print(f'Artist Albums: {artist.album_set.all()}')
print(f'Artist User: {artist.user.username}')
print(f'Playlist Tracks: {playlist.tracks.all()}')
print(f'User Playlists: {user.userplaylist_set.all()}')
