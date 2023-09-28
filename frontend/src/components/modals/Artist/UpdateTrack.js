import React from 'react';

function UpdateTrack({ isOpen, onClose, track }) {
  const title = track?.title || '';
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    audio_file: null,
    description: '',
    cover_image: null,
  });
  const { sendAuthorizedRequest } = useAuth();

  useEffect(() => {
    setFormData({
      ...formData,
      title: title,
    });
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleUpdate = async () => {
    // Send a POST request to the selected track endpoint with the track_id
    await sendAuthorizedRequest(`/tracks/${track.id}`, 'put', formData);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update A Track</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Update Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                required
              />
            </FormControl>
            <FormControl id="genre" isRequired>
              <FormLabel>Update Genre</FormLabel>
              <Select
                placeholder="Select a genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.title}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="audio_file" isRequired>
              <FormLabel>Update Track</FormLabel>
              <Input
                name="audio_file"
                value={formData.audio_file}
                onChange={handleInputChange}
                type="file"
                required
              />
            </FormControl>
            <FormControl id="cover_image" isRequired>
              <FormLabel>Update Cover Image</FormLabel>
              <Input
                name="cover_image"
                value={formData.cover_image}
                onChange={handleInputChange}
                type="file"
                required
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Update Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                type="file"
                required
              ></Textarea>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateTrack;
