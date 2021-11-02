import "./GameButton.css";

const GameButton = ({ onClick, children }) => {
  return (
    <button className="game-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default GameButton;
