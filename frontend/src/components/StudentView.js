import { useState } from "react";
import LearningMode from "./LearningMode";
import WordGame from "./WordGame";

const StudentView = ({ Setmode }) => {
  const [mode, setMode] = useState(0);
  return (
    <>
      <button onClick={() => Setmode(0)}>Takaisin alkuun</button>
      {mode === 0 && <LearningMode setMode={setMode} />}
      {mode === 1 && <WordGame gameMode={mode} />}
      {mode === 2 && <WordGame gameMode={mode} />}
    </>
  );
};

export default StudentView;
