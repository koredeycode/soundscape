import { useParams } from 'react-router-dom';
import TrackList from '../lists/TrackList';

function TrackPage() {
  const { sendAuthorizedRequest } = useAuth();
  const [trackData, setTrackData] = useState(null);
  const { track_id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest(
        `/tracks/${track_id}`,
        'get',
        {}
      );
      console.log(data);
      setTrackData(data);
    })();
  }, []);
  return (
    trackData && (
      <Box p={4}>
        <Heading size="lg" mb={4}>
          {trackData.title}
        </Heading>
        <Image src={trackData.cover_image} alt="trackCover Cover" mb={4} />
        <TrackList tracks={[trackData]} />
      </Box>
    )
  );
}
export default TrackPage;
