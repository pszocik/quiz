import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Game from "./components/Game/Game.js";
import Modal from "./components/FramerModal/Modal.js";
import { AnimatePresence } from "framer-motion";

const App = () => {
  document.title = "Quiz | pszocik.github.io";
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const handleWinModalClose = () => setShowWinModal(false);
  const handleLoseModalClose = () => setShowLoseModal(false);
  const handleWinModalShow = () => setShowWinModal(true);
  const handleLoseModalShow = () => setShowLoseModal(true);

  return (
    <div className="App">
      <Header />
      <Game
        handleWinModalShow={handleWinModalShow}
        handleLoseModalShow={handleLoseModalShow}
      />
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {showLoseModal && (
          <Modal handleClose={handleLoseModalClose} text={"You lost!"} />
        )}
        {showWinModal && (
          <Modal
            handleClose={handleWinModalClose}
            text={"Congratulations! You won!"}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
