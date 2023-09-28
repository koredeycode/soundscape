import React from 'react';
import { useParams } from 'react-router-dom';

export default function ArtistTrack() {
  const { track_id } = useParams();

  return <div>ArtistTrack</div>;
}
