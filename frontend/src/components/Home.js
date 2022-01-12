import { useState } from "react";
import ModeSelect from "./ModeSelect";
import TeacherView from "./TeacherView";
import StudentView from "./StudentView";
import Login from "./Login";

/**
 * This component acts as the Home page of the app. It conditionally renders either Teacher, Student, Login or ModeSelect view based
 * on it's state.
 * @param {Number} state is the viewing state inherited from App.js. that defines what is rendered.
 * @param {Number} amount is inherited state that defines the amount of questions in the game
 * @returns The component conditionally returns different components according to it's state.
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
