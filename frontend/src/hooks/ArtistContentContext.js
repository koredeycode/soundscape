import React, { createContext, useContext, useState } from 'react';
import ProfilePage from '../components/pages/ProfilePage';

const ArtistContentContext = createContext();

export function ArtistContentProvider({ children }) {
  const [artistContent, setArtistContent] = useState(<ProfilePage />);

  return (
    <ArtistContentContext.Provider value={{ artistContent, setArtistContent }}>
      {children}
    </ArtistContentContext.Provider>
  );
}

export function useArtistContent() {
  return useContext(ArtistContentContext);
}
