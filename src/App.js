import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Game from "./components/Game/Game.js";
import Modal from "./components/Modal/Modal.js";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Highscores from "./components/Highscores/Highscores";
import Menu from "./components/Menu/Menu";
import FadeInWrapper from "./components/FadeInWrapper/FadeInWrapper";
import { getFirebaseAuthUser } from "./components/Firebase/context";
import MenuButton from "./components/MenuButton/MenuButton";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  document.title = "Quiz | pszocik.github.io";
  const user = getFirebaseAuthUser();
  const [modal, setModal] = useState({ show: false, text: "" });
  let location = useLocation();

  const handleModalClose = () => setModal({ show: false, text: "" });
  const handleModalShow = (text) => setModal({ show: true, text: text });

  return (
    <main className="App">
      <Header />
      {location.pathname !== "/quiz/" && location.pathname !== "/quiz" && (
        <FadeInWrapper key={uuidv4()}>
          <MenuButton />
        </FadeInWrapper>
      )}
      <Routes>
        <Route
          exact
          path="/quiz/"
          element={
            <FadeInWrapper key={uuidv4()}>
              <Menu />
            </FadeInWrapper>
          }
        />
        <Route
          path="/quiz/game"
          element={
            <FadeInWrapper key={uuidv4()}>
              <Game handleModalShow={handleModalShow} />
            </FadeInWrapper>
          }
        />
        <Route
          path="/quiz/highscores"
          element={
            <FadeInWrapper key={uuidv4()}>
              {user ? <Highscores /> : <Navigate to="/" />}
            </FadeInWrapper>
          }
        />
      </Routes>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modal.show && (
          <Modal handleClose={handleModalClose} text={modal.text} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
