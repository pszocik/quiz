import FirebaseApp from "./config";
import Button from "../Button/Button";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  };

  return <Button onClick={signInWithGoogle}>Sign In with Google</Button>;
};

const SignOut = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return auth.currentUser && <Button onClick={handleSignOut}>Sign Out</Button>;
};
export { auth, SignIn, SignOut };
