import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navi from "./components/Navi";
import Home from "./components/Home";
import Settings from "./components/Settings";

function App() {
  const [homeState, setHomeState] = useState(0);
  const [amountState, setAmountState] = useState(5);

  return (
    <BrowserRouter>
      {" "}
      <div className="App">
        <Navi />{" "}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onClick={() => setHomeState(0)}
                  state={homeState}
                  amount={amountState}
                />
              }
            />
            <Route
              path="/settings"
              element={<Settings setAmount={setAmountState} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
