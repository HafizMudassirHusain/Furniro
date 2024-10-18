import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../pages/firebase'; // import firebase auth

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Track user state
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user , setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
