import { SignIn, SignOut } from "../Firebase/Auth";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Menu.css";
import { useFirebaseAuth } from "../Firebase/context";

const Menu = () => {
  const user = useFirebaseAuth();
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
