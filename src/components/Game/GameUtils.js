import { htmlDecode } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

const joinAnswers = (questionData) => [
  ...questionData["incorrect_answers"],
  questionData["correct_answer"],
];

const cleanAnswers = (answers) => {
  return answers.map((answer) => htmlDecode(answer));
};

const shuffleAnswers = (answers) => {
  const shuffledAnswers = [...answers];
  // bad example of random sorting but it's enough for this app
  return shuffledAnswers.sort(() => 0.5 - Math.random());
};

const appendUUIDToAnswers = (answers) => {
  return answers.map((el) => ({ uuid: uuidv4(), answer: el }));
};

export { joinAnswers, cleanAnswers, shuffleAnswers, appendUUIDToAnswers };
