import Button from "../Button/Button.js";
import "./Question.css";

const Question = ({
  question,
  setQuestion,
  setLoadQuestion,
  points,
  setPoints,
  setShowModal,
}) => {
  const validateAnswer = (ev, answer) => {
    if (answer === question["correct_answer"]) {
      ev.target.style.backgroundColor = "green";
      setPoints(points + 1);
      setLoadQuestion(true);
    } else {
      setShowModal(true);
      setPoints(0);
      setQuestion({});
    }
  };

  return (
    <div className="question">
      <p>{question.question}</p>
      {question.all_answers.map((answer) => {
        return (
          <Button
            onClick={(ev) => validateAnswer(ev, answer.answer)}
            key={answer.uuid}
          >
            {answer.answer}
          </Button>
        );
      })}
    </div>
  );
};

export default Question;
