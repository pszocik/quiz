// noinspection ES6UnusedImports

import FirebaseApp from "./config";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";

const FirebaseAuthContext = createContext(undefined);

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user };

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.user;
};

export { FirebaseAuthProvider, useFirebaseAuth };
