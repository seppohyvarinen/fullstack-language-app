import { useState } from "react";

const EditModal = ({ editFin, editEng, setEdit }) => {
  const [fin, setFin] = useState(editFin);
  const [eng, setEng] = useState(editEng);

  const handleFin = (e) => {
    setFin(e.target.value);
  };

  const handleEng = (e) => {
    setEng(e.target.value);
  };
  return (
    <div className="modalBG">
      <div className="EditModal">
        <button onClick={() => setEdit(false)} className="closeEdit">
          {" "}
          X{" "}
        </button>
        <div className="EditInputs">
          <h2> Suomeksi </h2>
          <input type={"text"} onChange={handleFin} value={fin}></input>
          <h2> In english </h2>
          <input type={"text"} onChange={handleEng} value={eng}></input>
        </div>
        <div className="EditButtons"></div>
      </div>
    </div>
  );
};

export default EditModal;
