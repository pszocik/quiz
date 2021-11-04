import "./Modal.css";
import Button from "../Button/Button";

const Modal = ({ bodyText, buttonText, onClick }) => {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <p>{bodyText}</p>
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default Modal;
