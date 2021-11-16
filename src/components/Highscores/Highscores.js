import "./Highscores.css";
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
    <FadeInWrapper className={"highscores"}>
      <h2>Highscores</h2>
      {scores.map((score) => {
        return <p key={score.toString()}>{score}</p>;
      })}
    </FadeInWrapper>
  );
};

export default Highscores;
