import FinEng from "../img/fin-eng.png";
import EngFin from "../img/eng-fin.png";

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
