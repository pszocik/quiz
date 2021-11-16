import Button from "../Button/Button.js";
import "./Question.css";
import { AnimatePresence, motion } from "framer-motion";
import FadeInWrapper from "../FadeInWrapper/FadeInWrapper";

const Question = ({ question, handleGoodAnswer, handleBadAnswer }) => {
  const validateAnswer = (ev, answer) =>
    answer === question["correct_answer"]
      ? handleGoodAnswer(ev)
      : handleBadAnswer();

  return (
    <AnimatePresence exitBeforeEnter>
      <FadeInWrapper className="question" key={question.uuid}>
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
      </FadeInWrapper>
    </AnimatePresence>
  );
};

export default Question;
