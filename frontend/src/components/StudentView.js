import { useState } from "react";
import LearningMode from "./LearningMode";
import WordGame from "./WordGame";

/**
 * This component acts as the base component for the student view. It by default renders LearningMode component
 * where user selects preferred mode. With mode selected the component renders the WordGame with specific mode.
 * @param {Number} Setmode is setter for the Mode state in the Home component. It is used in a button and also passed forward
 * for return purposes.
 * @param {Number} amount is state inherited from Home component, defines the amount of words used in the game.
 * @returns a button for returning and conditionally either mode select screen or the WordGame with specific mode.
 */

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
