import Button from "../Button/Button.js";
import "./Question.css";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import FadeInWrapper from "../FadeInWrapper/FadeInWrapper";

const Question = ({ question, handleGoodAnswer, handleBadAnswer }) => {
  const validateAnswer = (ev, answer) =>
    answer === question["correct_answer"]
      ? handleGoodAnswer(ev)
      : handleBadAnswer();

  return (
    <AnimatePresence initial={true} exitBeforeEnter={true}>
      <FadeInWrapper className="question">
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
