import { useState, useEffect } from "react";
import Question from "../Question/Question.js";
import Button from "../Button/Button.js";
import { htmlDecode, pipe } from "../../utils/utils.js";
import {
  joinAnswers,
  cleanAnswers,
  shuffleAnswers,
  appendUUIDToAnswers,
} from "./GameUtils.js";
import "./Game.css";

const Game = ({ setShowModal }) => {
  const [loadQuestion, setLoadQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (loadQuestion === true) {
      fetch("https://opentdb.com/api.php?amount=20")
        .then((response) => response.json())
        .then((json) => {
          const questionData = json.results;
          for (const question of questionData) {
            question.question = htmlDecode(question.question);
            question.correct_answer = htmlDecode(question.correct_answer);
            question.all_answers = pipe(
              joinAnswers,
              cleanAnswers,
              shuffleAnswers,
              appendUUIDToAnswers
            )(question);
          }
          setQuestions(questionData);
        });
    }
  }, [loadQuestion]);

  const handleGoodAnswer = (ev) => {
    ev.target.style.backgroundColor = "green";
    setPoints(points + 1);
  };

  const handleBadAnswer = () => {
    setShowModal(true);
    setPoints(0);
    setQuestions([]);
    setLoadQuestion(false);
  };

  return (
    <div>
      {questions.length ? (
        <div>
          <h4 className="game-points">Points: {points}</h4>
          <Question
            key={questions.data}
            question={questions.pop()}
            handleGoodAnswer={handleGoodAnswer}
            handleBadAnswer={handleBadAnswer}
          />
        </div>
      ) : (
        <Button onClick={() => setLoadQuestion(true)}>Start game</Button>
      )}
    </div>
  );
};

export default Game;
