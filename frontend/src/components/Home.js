import { useState } from "react";
import ModeSelect from "./ModeSelect";
import TeacherView from "./TeacherView";
import StudentView from "./StudentView";
import Login from "./Login";

const Home = ({ state, amount }) => {
  const [mode, Setmode] = useState(state);

  return (
    <div>
      {mode === 0 && <ModeSelect Setmode={Setmode} />}
      {mode === 1 && <Login Setmode={Setmode} />}
      {mode === 2 && <StudentView Setmode={Setmode} amount={amount} />}
      {mode === 3 && <TeacherView Setmode={Setmode} />}
    </div>
  );
};

export default Home;
