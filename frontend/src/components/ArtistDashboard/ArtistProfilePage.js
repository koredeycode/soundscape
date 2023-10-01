import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import {
  Box,
  Stack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from '@chakra-ui/react';
import TrackList from '../artist_lists/TrackList';
import AlbumList from '../artist_lists/AlbumList';

import {
  Heading,
  Avatar,
  Center,
  Text,
  IconButton,
  Icon,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import EditArtistProfile from '../modals/Artist/EditArtistProfile';
import CreateAlbum from '../modals/Artist/CreateAlbum';
import CreateTrack from '../modals/Artist/CreateTrack';

const editIcon = <Icon as={FaEdit} w="1.5em" h="1.5em" />;

function ArtistProfilePage() {
  const { sendAuthorizedRequest } = useAuth();
  const [artistData, setArtistData] = useState({});
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isCreateTrackOpen,
    onOpen: onCreateTrackOpen,
    onClose: onCreateTrackClose,
  } = useDisclosure();
  const {
    isOpen: isCreateAlbumOpen,
    onOpen: onCreateAlbumOpen,
    onClose: onCreateAlbumClose,
  } = useDisclosure();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest('/isartist', 'get', {});
      console.log(data.id);
      const retdata = await sendAuthorizedRequest(
        `/artists/${data.id}`,
        'get',
        {}
      );
      setArtistData(retdata);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest('/genres', 'get', {});
      console.log(data);
      setGenres(data);
    })();
  }, []);
  return (
    <>
      <Center py={2}>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          p={2}
          textAlign={'center'}
        >
          <HStack>
            <Avatar
              size={'xl'}
              src={artistData.artist?.profile_image}
              mb={4}
              pos={'relative'}
            />
            <Box>
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {artistData.artist?.name || ''}
              </Heading>
              <Text
                textAlign={'center'}
                color={useColorModeValue('gray.700', 'gray.400')}
                px={3}
              >
                {artistData.artist?.bio || ''}
              </Text>
            </Box>
            <IconButton
              icon={editIcon}
              aria-label={`Edit Profile`}
              size="sm"
              variant="ghost"
              onClick={onOpen}
            />
          </HStack>

          <Tabs align="center">
            <TabList>
              <Tab>Tracks</Tab>
              <Tab>Albums</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Button colorScheme="teal" onClick={onCreateTrackOpen}>
                  Create New Track
                </Button>
                {artistData.tracks?.length > 0 ? (
                  <Box>
                    <Stack spacing={2}>
                      <TrackList tracks={artistData.tracks} />
                    </Stack>
                  </Box>
                ) : (
                  <Box>No tracks found</Box>
                )}
              </TabPanel>
              <TabPanel>
                <Button colorScheme="teal" onClick={onCreateAlbumOpen}>
                  Create New Album
                </Button>
                {artistData.albums?.length > 0 ? (
                  <Box>
                    <Stack spacing={2}>
                      <AlbumList albums={artistData.albums} />
                    </Stack>
                  </Box>
                ) : (
                  <Box>No albums found</Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
      <EditArtistProfile
        artist={artistData.artist}
        isOpen={isOpen}
        onClose={onClose}
      />
      <CreateTrack
        isOpen={isCreateTrackOpen}
        onClose={onCreateTrackClose}
        genres={genres}
      />
      <CreateAlbum isOpen={isCreateAlbumOpen} onClose={onCreateAlbumClose} />
    </>
  );
}

export default ArtistProfilePage;
