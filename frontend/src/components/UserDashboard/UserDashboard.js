import { Link } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import {
  MdOutlineLibraryMusic,
  MdLibraryMusic,
  MdSearch,
  MdOutlineSearch,
  MdHome,
  MdOutlineHome,
  MdOpenInNew,
  MdPerson,
  MdPersonOutline,
} from 'react-icons/md';
import { useAuth } from '../../hooks/AuthContext';
import { useState } from 'react';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';

const UserLinkItems = [
  {
    name: 'Home',
    icon: { inactive: MdOutlineHome, active: MdHome },
    url: '/dashboard',
  },
  {
    name: 'Search',
    icon: { inactive: MdOutlineSearch, active: MdSearch },
    url: '/search',
  },
  {
    name: 'Playlists',
    icon: { inactive: MdOutlineLibraryMusic, active: MdLibraryMusic },
    url: '/playlists',
  },
];

const ArtistLinkItems = [
  {
    name: 'Artist Profile',
    icon: { inactive: MdPersonOutline, active: MdPerson },
    url: '/artist-profile',
  },
];

export const FootContent = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { currentUser } = useAuth();

  return (
    <Stack
      direction="row"
      w="100%"
      display={{ base: 'flex', md: 'none' }}
      justifyContent="space-around"
      py={{ base: 2, md: 4 }}
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      pos="fixed"
      bottom="0"
    >
      {UserLinkItems.map((link, idx) => {
        return (
          <NavItem
            key={link.name}
            link={link}
            isActive={activeItem === idx}
            onClick={() => {
              setActiveItem(idx);
            }}
            icon={activeItem === idx ? link.icon.active : link.icon.inactive}
          />
        );
      })}
      {currentUser.is_artist
        ? ArtistLinkItems.map((link, idx) => {
            return (
              <NavItem
                key={link.name}
                link={link}
                isActive={activeItem === idx + UserLinkItems.length}
                onClick={() => {
                  setActiveItem(idx + UserLinkItems.length);
                }}
                icon={
                  activeItem === idx + UserLinkItems.length
                    ? link.icon.active
                    : link.icon.inactive
                }
              />
            );
          })
        : null}
    </Stack>
  );
};

export const SidebarContent = ({ ...rest }) => {
  const [activeItem, setActiveItem] = useState(0);
  const { currentUser } = useAuth();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Soundscape
        </Text>
      </Flex>
      {UserLinkItems.map((link, idx) => (
        <NavItem
          key={link.name}
          icon={activeItem === idx ? link.icon.active : link.icon.inactive}
          onClick={() => {
            console.log(idx);
            setActiveItem(idx);
          }}
          isActive={activeItem === idx}
          link={link}
        />
      ))}
      {currentUser.is_artist
        ? ArtistLinkItems.map((link, idx) => (
            <NavItem
              key={link.name}
              icon={
                activeItem === idx + UserLinkItems.length
                  ? link.icon.active
                  : link.icon.inactive
              }
              onClick={() => {
                setActiveItem(idx + UserLinkItems.length);
              }}
              isActive={activeItem === idx + UserLinkItems.length}
              link={link}
            />
          ))
        : null}
    </Box>
  );
};

export const NavItem = ({ link, icon, isActive, onClick }) => {
  return (
    <Box onClick={onClick}>
      <ChakraLink
        as={Link}
        to={link.url}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap="1"
        p="2"
        mx="2"
        cursor="pointer"
        bg={{
          base: 'transparent',
          md: `${isActive ? 'gray.100' : 'transparent'}`,
        }}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'black',
          }}
          as={icon}
          w={{ base: '2em', md: '1.5em' }}
          h={{ base: '2em', md: '1.5em' }}
        />
        <Text display={{ base: 'none', md: 'inline-block' }}>{link.name}</Text>
      </ChakraLink>
    </Box>
  );
};

export const NavBar = ({ ...rest }) => {
  const { stopAudio } = useAudioPlayerContext();
  const { logout, currentUser: user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      py={{ base: 2, md: 2 }}
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
      pos="sticky"
      top="0"
      zIndex="2"
    >
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Soundscape
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={'https://via.placeholder.com/100'} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{`${user.first_name || 'Fname'} ${
                    user.last_name || 'Lname'
                  }`}</Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              borderRadius={'0'}
            >
              <MenuItem>
                <ChakraLink
                  as={Link}
                  to="/profile"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="1"
                  cursor="pointer"
                  _hover={{
                    textDecoration: 'none',
                  }}
                  w="100%"
                >
                  Profile
                </ChakraLink>
              </MenuItem>

              <MenuItem>
                <ChakraLink
                  as={Link}
                  to="/settings"
                  color="black"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="1"
                  cursor="pointer"
                  _hover={{
                    textDecoration: 'none',
                  }}
                  w="100%"
                >
                  Settings
                </ChakraLink>
              </MenuItem>

              {!user.is_artist && (
                <>
                  <MenuDivider />
                  <MenuItem>
                    <ChakraLink
                      as={Link}
                      to="/become-artist"
                      color="black"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap="1"
                      cursor="pointer"
                      _hover={{
                        textDecoration: 'none',
                      }}
                      w="100%"
                    >
                      Become an Artist
                    </ChakraLink>
                  </MenuItem>
                </>
              )}

              <MenuDivider />
              <MenuItem
                onClick={() => {
                  stopAudio();
                  handleLogout();
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
