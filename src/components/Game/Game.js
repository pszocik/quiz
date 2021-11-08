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

const Game = ({ handleWinModalShow, handleLoseModalShow }) => {
  const [loadQuestions, setLoadQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);

  const handleSetPoints = (value) => setPoints(value);
  const handleSetQuestions = (data) => setQuestions(data);
  const handleLoadQuestion = () => setLoadQuestions(true);
  const handleDontLoadQuestion = () => setLoadQuestions(false);

  useEffect(() => {
    if (loadQuestions === true) {
      fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => response.json())
        .then((json) => {
          const questionData = json.results;
          questionData.forEach((question) => {
            question.question = htmlDecode(question.question);
            question.correct_answer = htmlDecode(question.correct_answer);
            question.all_answers = pipe(
              joinAnswers,
              cleanAnswers,
              shuffleAnswers,
              appendUUIDToAnswers
            )(question);
          });
          handleSetQuestions(questionData);
          handleDontLoadQuestion();
        });
    }
  }, [loadQuestions]);

  useEffect(() => {
    if (points === 10) {
      handleSetPoints(0);
      handleWinModalShow();
    }
  }, [points, handleWinModalShow]);

  const handleGoodAnswer = (ev) => {
    const updatedQuestions = [...questions];
    updatedQuestions.pop();
    handleSetQuestions(updatedQuestions);
    handleSetPoints(points + 1);
  };

  const handleBadAnswer = () => {
    handleLoseModalShow();
    handleSetPoints(0);
    handleSetQuestions([]);
    handleLoadQuestion();
  };

  return (
    <div>
      {questions.length ? (
        <div>
          <h4 className="game-points">Points: {points}</h4>
          <Question
            key={questions.data}
            question={questions[questions.length - 1]}
            handleGoodAnswer={handleGoodAnswer}
            handleBadAnswer={handleBadAnswer}
          />
        </div>
      ) : (
        <Button onClick={() => handleLoadQuestion()}>Start game</Button>
      )}
    </div>
  );
};

export default Game;
