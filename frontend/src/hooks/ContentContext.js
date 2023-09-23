import React, { createContext, useContext, useState } from 'react';
import Home from '../components/pages/Home';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(<Home />);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
