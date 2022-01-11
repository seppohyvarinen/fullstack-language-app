import { useState } from "react";
import ModeSelect from "./ModeSelect";
import TeacherView from "./TeacherView";
import StudentView from "./StudentView";
import Login from "./Login";

/**
 * @component
 * @param {*} param0
 * @returns
 */

const Home = ({ state, amount }) => {
  const [mode, Setmode] = useState(state);
  const [token, setToken] = useState("");

  return (
    <div>
      {mode === 0 && <ModeSelect Setmode={Setmode} />}
      {mode === 1 && <Login Setmode={Setmode} setToken={setToken} />}
      {mode === 2 && <StudentView Setmode={Setmode} amount={amount} />}
      {mode === 3 && (
        <TeacherView token={token} setToken={setToken} Setmode={Setmode} />
      )}
    </div>
  );
};

export default Home;
