import Modal from "./Modal.js";

const WinModal = ({ onClick }) => {
  return (
    <Modal
      bodyText={"Congratulations! You won!"}
      buttonText={"Continue"}
      onClick={onClick}
    />
  );
};

export default WinModal;
