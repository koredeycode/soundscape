import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Skeleton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import TrackList from '../lists/TrackList';
import AlbumList from '../lists/AlbumList';
import ArtistList from '../lists/ArtistList';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { sendAuthorizedRequest } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await sendAuthorizedRequest('/search', 'post', {
        search: searchTerm,
      });
      console.log(data);

      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              placeholder="Enter your search term..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleSubmit}
                isLoading={isLoading}
                type="submit"
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
        <Skeleton isLoaded={!isLoading} />
        <Text fontSize="lg" fontWeight="bold">
          Search Results:
        </Text>
        <Tabs align="center">
          <TabList>
            <Tab>Tracks</Tab>
            <Tab>Artists</Tab>
            <Tab>Albums</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {searchResults.tracks?.length > 0 ? (
                <Box>
                  <Stack spacing={2}>
                    <TrackList tracks={searchResults.tracks} />
                  </Stack>
                </Box>
              ) : (
                <Box>No tracks found</Box>
              )}
            </TabPanel>
            <TabPanel>
              {searchResults.artists?.length > 0 ? (
                <Box>
                  <Stack spacing={2}>
                    <ArtistList artists={searchResults.artists} />
                  </Stack>
                </Box>
              ) : (
                <Box>No artist found</Box>
              )}
            </TabPanel>
            <TabPanel>
              {searchResults.albums?.length > 0 ? (
                <Box>
                  <Stack spacing={2}>
                    <AlbumList albums={searchResults.albums} />
                  </Stack>
                </Box>
              ) : (
                <Box>No albums found</Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
}

export default SearchPage;
