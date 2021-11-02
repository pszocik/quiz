import "./Modal.css";
import GameButton from "../GameButton/GameButton";

const Modal = ({ bodyText, buttonText, onClick }) => {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <p>{bodyText}</p>
        <GameButton onClick={onClick}>{buttonText}</GameButton>
      </div>
    </div>
  );
};

export default Modal;
