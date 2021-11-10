import { auth, SignIn, SignOut } from "../Auth/Auth";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Menu.css";
import { useAuthState } from "react-firebase-hooks/auth";

const Menu = () => {
  const [user] = useAuthState(auth);
  return (
    <section className="menu">
      {user ? <SignOut /> : <SignIn />}
      <Link to="/game" className="link">
        <Button>Game</Button>
      </Link>
      {user && (
        <Link to="/highscores" className="link">
          <Button>Highscores</Button>
        </Link>
      )}
    </section>
  );
};

export default Menu;
