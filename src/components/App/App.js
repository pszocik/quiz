import Header from "../Header/Header";
import Game from "../Game/Game";
import "./App.css";

function App() {
  document.title = "Quiz | pszocik.github.io";
  return (
    <div className="App">
      <Header />
      <Game />
    </div>
  );
}

export default App;
