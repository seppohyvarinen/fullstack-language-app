import { useState } from "react";
import ModeSelect from "./components/ModeSelect";
import TeacherView from "./components/TeacherView";
import StudentView from "./components/StudentView";

function App() {
  const [mode, Setmode] = useState(0);

  return (
    <div className="App">
      {mode === 0 && <ModeSelect Setmode={Setmode} />}
      {mode === 1 && <TeacherView Setmode={Setmode} />}
      {mode === 2 && <StudentView Setmode={Setmode} />}
    </div>
  );
}

export default App;
