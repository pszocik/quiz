import { useState, useEffect } from "react";
import Question from "../Question/Question.js";
import Button from "../Button/Button.js";
import { htmlDecode, pipe } from "../../helpers/helpers.js";
import {
  joinAnswers,
  cleanAnswers,
  shuffleAnswers,
  appendUUIDToAnswers,
  modifyQuestionAnswers,
} from "./helpers.js";
import "./Game.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import MenuButton from "../MenuButton/MenuButton.js";
import { getScores, updateScores } from "../Firebase/firestore.js";
import { getFirebaseAuthUser } from "../Firebase/context.js";
import ProgressBar from "../ProgressBar/ProgressBar.js";
import FadeInWrapper from "../FadeInWrapper/FadeInWrapper";

const Game = ({ handleModalShow }) => {
  const [loadQuestions, setLoadQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const user = getFirebaseAuthUser();

  const handleSetPoints = (value) => setPoints(value);
  const handleSetQuestions = (data) => setQuestions(data);
  const handleLoadQuestions = () => setLoadQuestions(true);
  const handleDontLoadQuestions = () => setLoadQuestions(false);

  useEffect(() => {
    if (loadQuestions === false) return;
    axios
      .get("https://opentdb.com/api.php?amount=20")
      .then((response) => {
        const questionData = response.data.results;
        questionData.forEach((question) => {
          question.uuid = uuidv4();
          question.question = htmlDecode(question.question);
          question.correct_answer = htmlDecode(question.correct_answer);
          question.all_answers = modifyQuestionAnswers(question);
        });
        handleSetQuestions(questionData);
      })
      .catch((error) => console.log(error));
  }, [loadQuestions]);

  useEffect(() => {
    if (points < 20) return;
    handleSetPoints(0);
    handleModalShow("You won!");
  }, [points, handleModalShow]);

  const handleGoodAnswer = (ev) => {
    const updatedQuestions = [...questions];
    updatedQuestions.pop();
    handleSetQuestions(updatedQuestions);
    handleSetPoints(points + 1);
  };

  const handleBadAnswer = () => {
    handleModalShow("You lost!");
    user &&
      getScores(user.uid).then((data) => {
        updateScores(user.uid, points);
      });
    handleSetPoints(0);
    handleSetQuestions([]);
    handleDontLoadQuestions();
  };

  return (
    <FadeInWrapper>
      {questions.length ? (
        <div className="game-flex">
          <Question
            question={questions[questions.length - 1]}
            handleGoodAnswer={handleGoodAnswer}
            handleBadAnswer={handleBadAnswer}
          />
          <ProgressBar completed={points * 5} />
        </div>
      ) : (
        <Button onClick={() => handleLoadQuestions()}>New game</Button>
      )}
    </FadeInWrapper>
  );
};

export default Game;
