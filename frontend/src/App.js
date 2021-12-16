import { useState } from "react";
import ModeSelect from "./components/ModeSelect";

const axios = require("axios").default;

function App() {
  const [mode, Setmode] = useState(0);

  return <div className="App">{mode === 0 && <ModeSelect />}</div>;
}

export default App;
