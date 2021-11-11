import HomeButton from "../HomeButton/HomeButton";
import "./Highscores.css";
import { v4 as uuidv4 } from "uuid";
import { getFirebaseAuthUser } from "../Firebase/context";
import { useEffect, useState } from "react";
import { getScores } from "../Firebase/firestore";

const Highscores = () => {
  const user = getFirebaseAuthUser();
  const [scores, setScores] = useState([]);
  useEffect(() => {
    getScores(user.email).then((data) =>
      setScores(data.scores.slice(-10).reverse())
    );
  }, []);
  return (
    <main className="highscores">
      <HomeButton />
      <h2>Highscores</h2>
      {scores.map((score) => {
        return <p key={uuidv4()}>{score}</p>;
      })}
    </main>
  );
};

export default Highscores;
