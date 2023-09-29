import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  ChakraProvider,
  CSSReset,
  Box,
  extendTheme,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
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
import {
  FootContent,
  SidebarContent,
  NavBar,
} from './components/UserDashboard/UserDashboard';
import MusicPlayer from './components/UserDashboard/MusicPlayer';
import { Logo } from './Logo';
import ArtistDashboard from './components/ArtistDashboard/ArtistDashboard';
import ArtistProfilePage from './components/ArtistDashboard/ArtistProfilePage';
import ArtistAlbums from './components/ArtistDashboard/ArtistAlbums';
import ArtistAlbum from './components/ArtistDashboard/ArtistAlbum';
import ArtistTrack from './components/ArtistDashboard/ArtistTrack';

function App() {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  console.log(isAuthenticated);
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
      component: <div>Track page</div>,
    },
  ];

  const artistRoutes = [
    // {
    //   name: 'ArtistDashboard',
    //   key: 'artist-dashboard',
    //   route: '/artist-dashboard',
    //   component: <ArtistDashboard />,
    // },
    {
      name: 'ArtistProfile',
      key: 'artist-profile',
      route: '/artist-profile',
      component: <ArtistProfilePage />,
    },
    // {
    //   name: 'ArtistAlbums',
    //   key: 'artist-albums',
    //   route: '/artist-albums',
    //   component: <ArtistAlbums />,
    // },
    {
      name: 'ArtistAlbum',
      key: 'artist-album',
      route: '/artist-albums/:album_id',
      component: <ArtistAlbum />,
    },
    {
      name: 'ArtistTrack',
      key: 'artist-track',
      route: '/artist-tracks/:track_id',
      component: <ArtistTrack />,
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
          <Box ml={{ base: 0, md: 60 }} p="8">
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
