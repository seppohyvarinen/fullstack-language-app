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

  const saveEdit = (f, e) => {
    console.log("save");
  };

  const deleteWord = (f, e) => {
    console.log("delete");
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
        <div className="EditButtons">
          <button onClick={() => saveEdit(fin, eng)}>Tallenna</button>
          <button onClick={() => setEdit(false)}>Peruuta</button>
          <button onClick={() => deleteWord(fin, eng)}>
            Poista sana tietokannasta
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
