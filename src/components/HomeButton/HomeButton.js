import Button from "../Button/Button";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to="/quiz" className="link">
      <Button>Menu</Button>
    </Link>
  );
};

export default HomeButton;
