import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Question from "../Question/Question.js";
import GameButton from "../GameButton/GameButton.js";

const Game = () => {
  const [loadQuestion, setLoadQuestion] = useState(false);
  const [question, setQuestion] = useState({});
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (loadQuestion === true) {
      const url = "https://opentdb.com/api.php?amount=1";
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const questionData = json.results[0];
          questionData.all_answers = appendUUIDToAnswers(
            shuffleAnswers(joinAnswers(questionData))
          );
          setQuestion(questionData);
          setLoadQuestion(false);
        });
    }
  }, [loadQuestion]);

  const joinAnswers = (questionData) => [
    ...questionData["incorrect_answers"],
    questionData["correct_answer"],
  ];

  const shuffleAnswers = (answers) => {
    const shuffledAnswers = [...answers];
    return shuffledAnswers.sort((a, b) => 0.5 - Math.random());
  };

  const appendUUIDToAnswers = (answers) => {
    const answersWithUUIDs = [...answers];
    return answersWithUUIDs.map((el) => (el = { uuid: uuidv4(), answer: el }));
  };

  if (Object.keys(question).length !== 0) {
    return (
      <div>
        <h4>Points: {points}</h4>
        <Question
          question={question}
          setLoadQuestion={setLoadQuestion}
          setQuestion={setQuestion}
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
