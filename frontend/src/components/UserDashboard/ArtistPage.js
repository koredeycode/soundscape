import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import {
  Box,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
} from '@chakra-ui/react';
import TrackList from '../lists/TrackList';
import AlbumList from '../lists/AlbumList';

import {
  Heading,
  Avatar,
  Center,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function ArtistPage() {
  const { sendAuthorizedRequest, showToast } = useAuth();
  const [artistData, setArtistData] = useState({});
  const { artist_id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await sendAuthorizedRequest(
          `/artists/${artist_id}`,
          'get',
          {}
        );
        setArtistData(data);
      } catch (error) {
        showToast('Error', error.response.data?.error, 'error');
      }
    })();
  }, []);
  return (
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
            pos="relative"
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
  );
}

export default ArtistPage;
