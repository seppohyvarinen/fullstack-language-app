import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navi from "./components/Navi";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <div className="App">
        <Navi />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
