import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Question from "../Question/Question.js";
import GameButton from "../GameButton/GameButton.js";
import { htmlDecode } from "../../utils/utils.js";

const Game = () => {
  const [loadQuestion, setLoadQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const modifyQuestionData = (questionData) => {
      return appendUUIDToAnswers(
        shuffleAnswers(cleanAnswers(joinAnswers(questionData)))
      );
    };

    if (loadQuestion === true) {
      const url = "https://opentdb.com/api.php?amount=1";
      let questionData = {};
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          questionData = json.results[0];
          questionData.question = htmlDecode(questionData.question);
          questionData.all_answers = modifyQuestionData(questionData);
          setCurrentQuestion(questionData);
        });
      setLoadQuestion(false);
    }
  }, [loadQuestion]);

  const joinAnswers = (questionData) => [
    ...questionData["incorrect_answers"],
    questionData["correct_answer"],
  ];

  const cleanAnswers = (answers) => {
    return answers.map((answer) => htmlDecode(answer));
  };

  const shuffleAnswers = (answers) => {
    const shuffledAnswers = [...answers];
    return shuffledAnswers.sort((a, b) => 0.5 - Math.random());
  };

  const appendUUIDToAnswers = (answers) => {
    return answers.map((el) => (el = { uuid: uuidv4(), answer: el }));
  };

  if (Object.keys(currentQuestion).length !== 0) {
    return (
      <div>
        <h4>Points: {points}</h4>
        <Question
          question={currentQuestion}
          setLoadQuestion={setLoadQuestion}
          setQuestion={setCurrentQuestion}
          points={points}
          setPoints={setPoints}
        />
      </div>
    );
  } else {
    return (
      <div>
        <GameButton text={"Start game"} onClick={() => setLoadQuestion(true)} />
      </div>
    );
  }
};

export default Game;
