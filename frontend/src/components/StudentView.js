import { useState } from "react";
import LearningMode from "./LearningMode";
import WordGame from "./WordGame";

const StudentView = ({ Setmode, amount }) => {
  const [mode, setMode] = useState(0);
  return (
    <>
      <button className="Returnbtn" id="Menuscreen" onClick={() => Setmode(0)}>
        Takaisin alkuun
      </button>
      {mode === 0 && <LearningMode setMode={setMode} />}
      {mode === 1 && <WordGame gameMode={mode} amount={amount} />}
      {mode === 2 && <WordGame gameMode={mode} amount={amount} />}
    </>
  );
};

export default StudentView;
