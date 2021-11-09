import { useState, useEffect } from "react";
import Question from "../Question/Question.js";
import Button from "../Button/Button.js";
import { htmlDecode, pipe } from "../../helpers/helpers.js";
import {
  joinAnswers,
  cleanAnswers,
  shuffleAnswers,
  appendUUIDToAnswers,
} from "./GameHelpers.js";
import "./Game.css";
import axios from "axios";

const Game = ({ handleWinModalShow, handleLoseModalShow }) => {
  const [loadQuestions, setLoadQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);

  const handleSetPoints = (value) => setPoints(value);
  const handleSetQuestions = (data) => setQuestions(data);
  const handleLoadQuestions = () => setLoadQuestions(true);
  const handleDontLoadQuestions = () => setLoadQuestions(false);

  useEffect(() => {
    if (loadQuestions === true) {
      axios
        .get("https://opentdb.com/api.php?amount=10")
        .then((response) => {
          const questionData = response.data.results;
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
          handleDontLoadQuestions();
        })
        .catch((error) => console.log(error));
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
    handleDontLoadQuestions();
  };

  return (
    <div>
      {questions.length ? (
        <div>
          <h4 className="game-points">Points: {points}</h4>
          <Question
            question={questions[questions.length - 1]}
            handleGoodAnswer={handleGoodAnswer}
            handleBadAnswer={handleBadAnswer}
          />
        </div>
      ) : (
        <Button onClick={() => handleLoadQuestions()}>Start game</Button>
      )}
    </div>
  );
};

export default Game;
