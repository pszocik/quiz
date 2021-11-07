import Button from "../Button/Button.js";
import "./Question.css";
import { v4 as uuidv4 } from "uuid";

const Question = ({ question, handleGoodAnswer, handleBadAnswer }) => {
  const validateAnswer = (ev, answer) => {
    if (answer === question["correct_answer"]) {
      handleGoodAnswer(ev);
    } else {
      handleBadAnswer();
    }
  };

  return (
    <div key={uuidv4()} className="question slide-in-left">
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
