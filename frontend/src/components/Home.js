import { useState } from "react";
import ModeSelect from "./ModeSelect";
import TeacherView from "./TeacherView";
import StudentView from "./StudentView";
import Login from "./Login";

const Home = ({ state, amount }) => {
  const [mode, Setmode] = useState(state);
  const [authOk, setAuthOk] = useState(false);
  return (
    <div>
      {mode === 0 && <ModeSelect Setmode={Setmode} />}
      {mode === 1 && <Login Setmode={Setmode} setAuthOk={setAuthOk} />}
      {mode === 2 && <StudentView Setmode={Setmode} amount={amount} />}
      {authOk && <TeacherView Setmode={Setmode} setAuthOk={setAuthOk} />}
    </div>
  );
};

export default Home;
