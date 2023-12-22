//import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import History from "./components/History/History";
import Game from "./components/Game";
import { UserProvider } from "./UserContext";
function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/game-menu" element={<Menu />} />
            <Route path="/history" element={<History />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
