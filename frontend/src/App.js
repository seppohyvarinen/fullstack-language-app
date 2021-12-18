import { useState } from "react";

import Navi from "./components/Navi";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navi />

      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
