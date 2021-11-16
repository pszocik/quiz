import { SignIn, SignOut } from "../Firebase/Auth";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Menu.css";
import { getFirebaseAuthUser } from "../Firebase/context";
import FadeInWrapper from "../FadeInWrapper/FadeInWrapper";

const Menu = () => {
  const user = getFirebaseAuthUser();
  return (
    <FadeInWrapper className={"menu"}>
      {user ? <SignOut /> : <SignIn />}
      <Link to="/quiz/game" className="link">
        <Button>Game</Button>
      </Link>
      {user && (
        <Link to="/quiz/highscores" className="link">
          <Button>Highscores</Button>
        </Link>
      )}
    </FadeInWrapper>
  );
};

export default Menu;
