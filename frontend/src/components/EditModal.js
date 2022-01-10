import { useState } from "react";

const axios = require("axios").default;

const EditModal = ({
  editFin,
  editEng,
  setEdit,
  fetchAll,
  filterValue,
  fetchByTag,
}) => {
  const [fin, setFin] = useState(editFin);
  const [eng, setEng] = useState(editEng);
  const [memofin, setMemoFin] = useState(editFin);
  const [memoeng, setMemoEng] = useState(editEng);

  const handleFin = (e) => {
    setFin(e.target.value);
  };

  const handleEng = (e) => {
    setEng(e.target.value);
  };

  const saveEdit = async (f, e) => {
    try {
      await axios.patch("/translations", {
        english: memoeng,
        finnish: memofin,
        newEnglish: e,
        newFinnish: f,
      });
    } catch (error) {}
  };

  const deleteWord = async (f, e) => {
    try {
      await axios.delete("/translations", {
        data: { finnish: { f }, english: { e } },
      });

      if (filterValue === "Kaikki sanat" || filterValue.length === 0) {
        await fetchAll();
      } else {
        await fetchByTag(filterValue);
      }

      setEdit(false);
    } catch (error) {
      alert(error);
    }
    console.log("delete");
  };
  return (
    <div className="modalBG">
      <div className="EditModal">
        <button onClick={() => setEdit(false)} className="closeEdit">
          {" "}
          X{" "}
        </button>
        <h2 className="EditHeader">
          Muokkaa käännöstä tai poista se kokonaan tietokannasta
        </h2>
        <div className="EditInputs">
          <h2> Suomeksi </h2>
          <input type={"text"} onChange={handleFin} value={fin}></input>
          <h2> In english </h2>
          <input type={"text"} onChange={handleEng} value={eng}></input>
        </div>
        <div className="EditButtons">
          <button className="save" onClick={() => saveEdit(fin, eng)}>
            Tallenna
          </button>
          <button onClick={() => setEdit(false)}>Peruuta</button>
          <button
            className="delete"
            onClick={() =>
              window.confirm(`Poista sana tietokannasta? `) &&
              deleteWord(fin, eng)
            }
          >
            Poista sana tietokannasta
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
