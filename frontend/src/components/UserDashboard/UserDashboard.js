import { Link } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import {
  MdAdd,
  MdLibraryMusic,
  MdSearch,
  MdHome,
  MdOpenInNew,
} from 'react-icons/md';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import PlaylistsPage from '../pages/PlaylistsPage';
import Setting from '../pages/Setting';
import ProfilePage from '../pages/ProfilePage';
import { useState } from 'react';
import {
  useAudioPlayerContext,
  AudioPlayerProvider,
} from '../../hooks/AudioPlayerContext';
import {
  useUserContent,
  UserContentProvider,
} from '../../hooks/UserContentContext';

const LinkItems = [
  { name: 'Home', icon: MdHome, page: <Home /> },
  { name: 'Search', icon: MdSearch, page: <SearchPage /> },
  { name: 'Playlists', icon: MdLibraryMusic, page: <PlaylistsPage /> },
];
// { name: 'Create Playlist', icon: MdAdd },

const SidebarContent = ({ onClose, ...rest }) => {
  const [activeItem, setActiveItem] = useState(0);
  const { setUserContent } = useUserContent();
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
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, idx) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            setUserContent(link.page);
            setActiveItem(idx);
          }}
          isActive={activeItem === idx}
        >
          {link.name}
        </NavItem>
      ))}
      {currentUser.is_artist && (
        <Box
          position="absolute"
          bottom="125px"
          left="15px"
          m="2"
          _hover={{
            bg: 'gray.100',
            color: 'black',
          }}
        >
          <ChakraLink
            as={Link}
            to="/artist-dashboard"
            target="_blank"
            color="black"
            display="inline-block"
            p="3"
          >
            Artist Dashboard
            <Icon
              as={MdOpenInNew}
              ml="2"
              _groupHover={{
                color: 'black',
              }}
              w="1.5em"
              h="1.5em"
            />
          </ChakraLink>
        </Box>
      )}
    </Box>
  );
};

const NavItem = ({ icon, children, isActive, ...rest }) => {
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

const NavBar = ({ onOpen, handleLogout, user, ...rest }) => {
  const { stopAudio } = useAudioPlayerContext();
  const { setUserContent } = useUserContent();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
      pos="sticky"
      top="0"
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

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
              <MenuItem
                onClick={() => {
                  setUserContent(<ProfilePage />);
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setUserContent(<Setting />);
                }}
              >
                Settings
              </MenuItem>
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

const Content = () => {
  const { userContent } = useUserContent();
  return userContent;
};

const UserDashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AudioPlayerProvider>
      <UserContentProvider>
        <Box>
          <Box maxH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
              onClose={() => onClose}
              display={{ base: 'none', md: 'block' }}
            />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              returnFocusOnClose={false}
              onOverlayClick={onClose}
              initialFocusRef={null}
              size="xs"
            >
              <DrawerOverlay />
              <DrawerContent>
                <SidebarContent onClose={onClose} />
              </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <NavBar
              onOpen={onOpen}
              handleLogout={handleLogout}
              user={currentUser}
            />
            <Box ml={{ base: 0, md: 60 }} h="100vh" p="1">
              <Content />
            </Box>
          </Box>
          <Footer />
        </Box>
      </UserContentProvider>
    </AudioPlayerProvider>
  );
};

export default UserDashboard;