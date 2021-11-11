// noinspection ES6UnusedImports

import app from "./config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Button from "../Button/Button";

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };
  return <Button onClick={signInWithGoogle}>Sign In with Google</Button>;
};

const SignOut = () => {
  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
};
export { SignIn, SignOut, auth };
