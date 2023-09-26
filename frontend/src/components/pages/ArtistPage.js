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
} from '@chakra-ui/react';
import TrackList from '../lists/TrackList';
import AlbumList from '../lists/AlbumList';

import {
  Heading,
  Avatar,
  Center,
  Text,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

// function SocialProfileSimple() {
//   return (

//   );
// }

function ArtistPage({ artist_id }) {
  const { sendAuthorizedRequest } = useAuth();
  const [artistData, setArtistData] = useState({});

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest(
        `/artists/${artist_id}`,
        'get',
        {}
      );
      console.log(data);
      setArtistData(data);
    })();
  }, []);
  return (
    <Center py={6}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src={artistData.artist?.profile_image}
          mb={4}
          pos={'relative'}
        />
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
