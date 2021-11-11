import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Game from "./components/Game/Game.js";
import Modal from "./components/Modal/Modal.js";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import Highscores from "./components/Highscores/Highscores";
import Menu from "./components/Menu/Menu";
import FadeInWrapper from "./components/FadeInWrapper";
import { getFirebaseAuthUser } from "./components/Firebase/context";

const App = () => {
  document.title = "Quiz | pszocik.github.io";
  const user = getFirebaseAuthUser();
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const handleWinModalClose = () => setShowWinModal(false);
  const handleLoseModalClose = () => setShowLoseModal(false);
  const handleWinModalShow = () => setShowWinModal(true);
  const handleLoseModalShow = () => setShowLoseModal(true);

  return (
    <main className="App">
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <FadeInWrapper>
              <Menu />
            </FadeInWrapper>
          }
        />
        <Route
          path="/game"
          element={
            <FadeInWrapper>
              <Game
                handleWinModalShow={handleWinModalShow}
                handleLoseModalShow={handleLoseModalShow}
              />
            </FadeInWrapper>
          }
        />
        <Route
          path="Highscores"
          element={
            <FadeInWrapper>
              {user ? <Highscores /> : <Navigate to="/" />}
            </FadeInWrapper>
          }
        />
      </Routes>
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
    </main>
  );
};

export default App;
