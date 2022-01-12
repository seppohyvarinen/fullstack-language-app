import FinEng from "../img/fin-eng.png";
import EngFin from "../img/eng-fin.png";

/**
 * This component renders the divs that player can choose from (game modes).
 * @param setMode is setter controlling the state in StudentView that defines what is rendered.
 * @returns divs containing explanations and images of the game modes.
 */

const LearningMode = ({ setMode }) => {
  return (
    <div className="Modes">
      <div className="FinEng" onClick={() => setMode(1)}>
        <p className="Description">Opettele sanoja Suomesta Englanniksi</p>

        <img
          className="Flags"
          src={FinEng}
          alt="Suomen Lippu ja Britannian lippu"
        />
      </div>

      <div className="EngFin" onClick={() => setMode(2)}>
        <p className="Description">Opettele sanoja Englannista Suomeksi</p>

        <img
          className="Flags"
          src={EngFin}
          alt="Suomen Lippu ja Britannian lippu"
        />
      </div>
    </div>
  );
};

export default LearningMode;
