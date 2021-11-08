import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Button from "../Button/Button";

const firebaseConfig = {
  apiKey: "AIzaSyCk7HwdLJRzO5qbUIPE-K7nHTdI4ngFXPU",
  authDomain: "quiz-app-auth-d2fa3.firebaseapp.com",
  projectId: "quiz-app-auth-d2fa3",
  storageBucket: "quiz-app-auth-d2fa3.appspot.com",
  messagingSenderId: "951901024436",
  appId: "1:951901024436:web:5013594182f68c9f5a27e1",
  measurementId: "G-J2X2F32S5P",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
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
