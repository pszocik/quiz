import "./Highscores.css";
import { v4 as uuidv4 } from "uuid";
import { getFirebaseAuthUser } from "../Firebase/context";
import { useEffect, useState } from "react";
import { getScores } from "../Firebase/firestore";
import FadeInWrapper from "../FadeInWrapper/FadeInWrapper";

const Highscores = () => {
  const user = getFirebaseAuthUser();
  const [scores, setScores] = useState([]);
  useEffect(() => {
    getScores(user.uid).then((data) => {
      setScores(data.scores.slice(-5).reverse());
    });
  }, []);
  return (
    <main className="highscores">
      <h2>Highscores</h2>
      <FadeInWrapper key={uuidv4()}>
        {scores.map((score) => {
          return <p key={uuidv4()}>{score}</p>;
        })}
      </FadeInWrapper>
    </main>
  );
};

export default Highscores;
