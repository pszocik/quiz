// noinspection ES6UnusedImports

import app from "./config";
import React, { createContext, useState } from "react";
import firebase from "firebase/compat/app";
const FirebaseAuthContext = createContext(undefined);

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user };

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };
