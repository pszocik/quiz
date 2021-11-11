import { SignIn, SignOut } from "../Firebase/Auth";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Menu.css";
import { getFirebaseAuthUser } from "../Firebase/context";

const Menu = () => {
  const user = getFirebaseAuthUser();
  return (
    <section className="menu">
      {user ? <SignOut /> : <SignIn />}
      <Link to="/quiz/game" className="link">
        <Button>Game</Button>
      </Link>
      {user && (
        <Link to="/quiz/highscores" className="link">
          <Button>Highscores</Button>
        </Link>
      )}
    </section>
  );
};

export default Menu;
