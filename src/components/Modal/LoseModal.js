import Modal from "./Modal.js";

const LoseModal = ({ onClick }) => {
  return (
    <Modal
      bodyText={"Wrong answer, you lost!"}
      buttonText={"Continue"}
      onClick={onClick}
    />
  );
};

export default LoseModal;
