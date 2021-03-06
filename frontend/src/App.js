import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navi from "./components/Navi";
import Home from "./components/Home";
import Settings from "./components/Settings";
import About from "./components/About";

/**
 * This function is the main component of the translation application.
 * Contains states that hold information about Home components states and amountState that
 * holds information about amount the words used in the word game.
 * @returns {BrowserRouter} that has wrapped all the Routes used in the app inside.
 */

function App() {
  const [homeState, setHomeState] = useState(0);
  const [amountState, setAmountState] = useState(5);
  const [bgColor, setBgColor] = useState("default");
  const [mode, Setmode] = useState(0);

  return (
    <BrowserRouter>
      {" "}
      <div className={bgColor === "default" ? "App" : "MorningLight"}>
        <Navi Setmode={Setmode} />{" "}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onClick={() => setHomeState(0)}
                  state={homeState}
                  amount={amountState}
                  mode={mode}
                  Setmode={Setmode}
                />
              }
            />
            <Route
              path="/settings"
              exact
              element={<Settings setColor={setBgColor} />}
            />
            <Route
              path="/about"
              exact
              element={
                <About amount={amountState} setAmount={setAmountState} />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
