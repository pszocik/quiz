import "./Button.css";

const Button = ({ onClick, children }) => {
  return (
    <button className="game-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
