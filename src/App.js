import Header from "./components/Header/Header.js";
import Game from "./components/Game/Game.js";
import Modal from "./components/Modal/Modal.js";
import "./App.css";
import { useState } from "react";

function App() {
  document.title = "Quiz | pszocik.github.io";
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <Header />
      <Game />
      <Modal />
    </div>
  );
}

export default App;
