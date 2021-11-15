import { htmlDecode, pipe } from "../../helpers/helpers";
import { v4 as uuidv4 } from "uuid";

const joinAnswers = (questionData) => [
  ...questionData["incorrect_answers"],
  questionData["correct_answer"],
];

const cleanAnswers = (answers) => answers.map((answer) => htmlDecode(answer));

const shuffleAnswers = (answers) =>
  // bad example of random sorting but it's enough for this app
  [...answers].sort(() => 0.5 - Math.random());

const appendUUIDToAnswers = (answers) =>
  answers.map((el) => ({ uuid: uuidv4(), answer: el }));

const modifyQuestionAnswers = pipe(
  joinAnswers,
  cleanAnswers,
  shuffleAnswers,
  appendUUIDToAnswers
);

export { modifyQuestionAnswers };
