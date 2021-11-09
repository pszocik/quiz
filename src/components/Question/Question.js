import Button from "../Button/Button.js";
import "./Question.css";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

const Question = ({ question, handleGoodAnswer, handleBadAnswer }) => {
  const validateAnswer = (ev, answer) =>
    answer === question["correct_answer"]
      ? handleGoodAnswer(ev)
      : handleBadAnswer();

  return (
    <AnimatePresence initial={true} exitBeforeEnter={true}>
      <motion.div
        className="question"
        key={uuidv4()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Question;
