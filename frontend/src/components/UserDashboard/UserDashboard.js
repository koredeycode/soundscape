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
  Tooltip,
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
  MdMusicNote,
  MdOutlineMusicNote,
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
          <Box
            onClick={() => {
              setActiveItem(idx);
            }}
            p="2"
            key={idx}
            // bg={activeItem == idx ? 'gray.100' : 'transparent'}
          >
            <Tooltip label={link.name} placement="top">
              <ChakraLink
                as={Link}
                to={link.url}
                color="black"
                // display="inline-block"
                // p="3"
              >
                <Icon
                  _groupHover={{
                    color: 'black',
                  }}
                  as={activeItem == idx ? link.icon.active : link.icon.inactive}
                  w="2em"
                  h="2em"
                />
              </ChakraLink>
            </Tooltip>
          </Box>
        );
      })}
      {currentUser.is_artist
        ? ArtistLinkItems.map((link, idx) => {
            return (
              <Box
                onClick={() => {
                  setActiveItem(idx + UserLinkItems.length);
                }}
                p="2"
                key={idx}
                // bg={activeItem == idx + UserLinkItems.length ? 'gray.100' : 'transparent'}
              >
                <Tooltip label={link.name} placement="top">
                  <ChakraLink
                    as={Link}
                    to={link.url}
                    color="black"
                    // display="inline-block"
                    // p="3"
                  >
                    <Icon
                      _groupHover={{
                        color: 'black',
                      }}
                      as={
                        activeItem == idx + UserLinkItems.length
                          ? link.icon.active
                          : link.icon.inactive
                      }
                      w="2em"
                      h="2em"
                    />
                  </ChakraLink>
                </Tooltip>
              </Box>
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
            setActiveItem(idx);
          }}
          isActive={activeItem === idx}
        >
          <ChakraLink
            as={Link}
            to={link.url}
            color="black"
            // display="inline-block"
            // p="3"
          >
            {link.name}
          </ChakraLink>
        </NavItem>
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
            >
              <ChakraLink
                as={Link}
                to={link.url}
                color="black"
                // display="inline-block"
                // p="3"
              >
                {link.name}
              </ChakraLink>
            </NavItem>
          ))
        : null}
    </Box>
  );
};

export const NavItem = ({ icon, children, isActive, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="2"
        mx="2"
        role="group"
        cursor="pointer"
        // _hover={{
        //   bg: 'gray.100',
        //   color: 'black',
        // }}
        bg={isActive ? 'gray.100' : 'transparent'} // Apply active background color
        color="black" // Apply active text color
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'black',
            }}
            as={icon}
            w="1.5em"
            h="1.5em"
          />
        )}
        {children}
      </Flex>
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
                  color="black"
                  // display="inline-block"
                  // p="3"
                >
                  Profile
                </ChakraLink>
              </MenuItem>

              <MenuItem>
                <ChakraLink
                  as={Link}
                  to="/settings"
                  color="black"
                  // display="inline-block"
                  // p="3"
                >
                  Settings
                </ChakraLink>
              </MenuItem>

              <MenuDivider />
              {/* {user.is_artist && (
                <>
                  <MenuItem>
                    <ChakraLink
                      as={Link}
                      to="/artist-dashboard"
                      target="_blank"
                      color="black"
                      // display="inline-block"
                      // p="3"
                    >
                      Artist Dashboard
                      <Icon
                        as={MdOpenInNew}
                        ml="1"
                        _groupHover={{
                          color: 'black',
                        }}
                        w="1em"
                        h="1em"
                      />
                    </ChakraLink>
                  </MenuItem>
                  <MenuDivider />
                </>
              )} */}
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
