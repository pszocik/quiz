import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAuthProvider } from "./components/FirebaseAuth/context";

ReactDOM.render(
  <BrowserRouter>
    <FirebaseAuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      ,
    </FirebaseAuthProvider>
    ,
  </BrowserRouter>,
  document.getElementById("root")
);
