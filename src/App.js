import Header from "./components/Header/Header.js";
import Game from "./components/Game/Game.js";
// import LoseModal from "./components/Modal/LoseModal.js";
import WinModal from "./components/Modal/WinModal.js";
import FramerModal from "./components/FramerModal/FramerModal.js";
import "./App.css";
import { useState } from "react";

const App = () => {
  document.title = "Quiz | pszocik.github.io";
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  return (
    <div className="App">
      <Header />
      <Game
        setShowLoseModal={setShowLoseModal}
        setShowWinModal={setShowWinModal}
      />
      {showLoseModal && <FramerModal onClick={() => setShowLoseModal(false)} />}
      {showWinModal && <WinModal onClick={() => setShowWinModal(false)} />}
    </div>
  );
};

export default App;
