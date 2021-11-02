import GameButton from "../GameButton/GameButton.js";
import "./Question.css";

const Question = ({
  question,
  setQuestion,
  setLoadQuestion,
  points,
  setPoints,
}) => {
  const validateAnswer = (ev, answer) => {
    if (answer === question["correct_answer"]) {
      ev.target.style.backgroundColor = "green";
      setPoints(points + 1);
      setLoadQuestion(true);
    } else {
      setPoints(0);
      setQuestion({});
      alert("Wrong answer, try again!");
    }
  };

  return (
    <div className="question">
      <p>{question.question}</p>
      {question.all_answers.map((answer) => {
        return (
          <GameButton
            onClick={(ev) => validateAnswer(ev, answer.answer)}
            key={answer.uuid}
          >
            {answer.answer}
          </GameButton>
        );
      })}
    </div>
  );
};

export default Question;
