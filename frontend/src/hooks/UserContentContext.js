import React, { createContext, useContext, useState } from 'react';
import Home from '../components/pages/Home';

const UserContentContext = createContext();

export function UserContentProvider({ children }) {
  const [userContent, setUserContent] = useState(<Home />);

  return (
    <UserContentContext.Provider value={{ userContent, setUserContent }}>
      {children}
    </UserContentContext.Provider>
  );
}

export function useUserContent() {
  return useContext(UserContentContext);
}
