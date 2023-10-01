import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './hooks/AuthContext';
import { AudioPlayerProvider } from './hooks/AudioPlayerContext';
import Home from './components/UserDashboard/Home';
import SearchPage from './components/UserDashboard/SearchPage';
import PlaylistsPage from './components/UserDashboard/PlaylistsPage';
import PlaylistPage from './components/UserDashboard/PlaylistPage';
import Setting from './components/UserDashboard/Setting';
import ProfilePage from './components/UserDashboard/ProfilePage';
import ArtistPage from './components/UserDashboard/ArtistPage';
import AlbumPage from './components/UserDashboard/AlbumPage';
import TrackPage from './components/UserDashboard/TrackPage';
import {
  FootContent,
  SidebarContent,
  NavBar,
} from './components/UserDashboard/UserDashboard';
import MusicPlayer from './components/UserDashboard/MusicPlayer';
import ArtistProfilePage from './components/ArtistDashboard/ArtistProfilePage';
import ArtistAlbum from './components/ArtistDashboard/ArtistAlbum';
import CreateArtistProfile from './components/UserDashboard/CreateArtistProfile';

function App() {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const bg = useColorModeValue('white', 'gray.900');

  if (isLoading) {
    return (
      <Spinner
        w="200px"
        h="200px"
        my="auto"
        mx="auto"
        color="blue.500"
        position="absolute"
        top="50%"
        left="50%"
      />
    );
    // return <Logo />;
  }

  const userRoutes = [
    {
      name: 'Dashboard',
      key: 'dashboard',
      route: '/dashboard',
      component: <Home />,
    },
    {
      name: 'Search',
      key: 'search',
      route: '/search',
      component: <SearchPage />,
    },
    {
      name: 'Profile',
      key: 'profile',
      route: '/profile',
      component: <ProfilePage />,
    },
    {
      name: 'Playlists',
      key: 'playlists',
      route: '/playlists',
      component: <PlaylistsPage />,
    },
    {
      name: 'Playlist',
      key: 'playlist',
      route: '/playlists/:playlist_id',
      component: <PlaylistPage />,
    },
    {
      name: 'Artist',
      key: 'artist',
      route: '/artists/:artist_id',
      component: <ArtistPage />,
    },
    {
      name: 'Album',
      key: 'album',
      route: '/albums/:album_id',
      component: <AlbumPage />,
    },
    {
      name: 'Settings',
      key: 'settings',
      route: '/settings',
      component: <Setting />,
    },
    {
      name: 'Track',
      key: 'track',
      route: '/tracks/:track_id',
      component: <TrackPage />,
    },
    {
      name: 'Create Artist Profile',
      key: 'track',
      route: '/become-artist',
      component: <CreateArtistProfile />,
    },
  ];

  const artistRoutes = [
    {
      name: 'ArtistProfile',
      key: 'artist-profile',
      route: '/artist-profile',
      component: <ArtistProfilePage />,
    },
    {
      name: 'ArtistAlbum',
      key: 'artist-album',
      route: '/artist-albums/:album_id',
      component: <ArtistAlbum />,
    },
  ];

  const getUserRoutes = () =>
    userRoutes.map(route => {
      return (
        <Route
          exact
          path={route.route}
          element={route.component}
          key={route.key}
        />
      );
    });

  const getArtistRoutes = () =>
    artistRoutes.map(route => {
      return (
        <Route
          exact
          path={route.route}
          element={route.component}
          key={route.key}
        />
      );
    });

  return isAuthenticated ? (
    <AudioPlayerProvider>
      <Box>
        <Box bg={bg}>
          <SidebarContent display={{ base: 'none', md: 'block' }} />
          {/* mobilenav */}
          <NavBar />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <Routes>
              {getUserRoutes()}
              {currentUser?.is_artist ? getArtistRoutes() : null}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Box>
        </Box>
        <MusicPlayer />
        <FootContent />
      </Box>
    </AudioPlayerProvider>
  ) : (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
