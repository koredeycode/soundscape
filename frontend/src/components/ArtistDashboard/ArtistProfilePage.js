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
  Badge,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import EditArtistProfile from '../modals/Artist/EditArtistProfile';

const editIcon = <Icon as={FaEdit} w="1.5em" h="1.5em" />;

function ArtistProfilePage() {
  const { sendAuthorizedRequest } = useAuth();
  const [artistData, setArtistData] = useState({});
  const { isOpen, onClose, onOpen } = useDisclosure();

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
    </>
  );
}

export default ArtistProfilePage;
