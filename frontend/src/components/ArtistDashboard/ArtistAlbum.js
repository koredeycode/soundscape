import React from 'react';
import { useParams } from 'react-router-dom';

export default function ArtistAlbum() {
  const { album_id } = useParams();
  return <div>ArtistAlbum</div>;
}
