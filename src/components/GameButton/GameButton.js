import "./GameButton.css";

const GameButton = ({ text, onClick, key }) => {
  return (
    <button key={key} className="game-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default GameButton;
