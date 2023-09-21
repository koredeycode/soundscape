import React, { useState } from 'react';
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
        <Tabs>
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
                    {searchResults.tracks.map((track, index) => (
                      <Box
                        key={index}
                        borderWidth="1px"
                        borderColor="gray.200"
                        p={3}
                        borderRadius="md"
                      >
                        {track.title}
                      </Box>
                    ))}
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
                    {searchResults.artists.map((artist, index) => (
                      <Box
                        key={index}
                        borderWidth="1px"
                        borderColor="gray.200"
                        p={3}
                        borderRadius="md"
                      >
                        {artist.name}
                      </Box>
                    ))}
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
                    {searchResults.albums.map((album, index) => (
                      <Box
                        key={index}
                        borderWidth="1px"
                        borderColor="gray.200"
                        p={3}
                        borderRadius="md"
                      >
                        {album.title}
                      </Box>
                    ))}
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
