import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Button from "../Button/Button";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

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
