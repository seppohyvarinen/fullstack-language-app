import { useState } from "react";

const axios = require("axios").default;

/**
 *
 * @param {String} editFin is received as props and set to state fin so user is shown correct finnish translation of the selected word.
 * @param {String} editEng is received as props and set to state eng so user is shown correct english translation of the selected word.
 * @param setEdit is the setter received as props used to close the edit screen.
 * @param fetchAll is the async function that fetches all words.
 * Called when word is edited or deleted so user is shown updated word list.
 * @param filterValue is filter value received as props so fetchByTag can be done with correct tag value
 * @param fetchAll is the async function that fetches words by tag.
 * Called when word is edited or deleted so user is shown updated word list.
 * @param token is the JWT access token that is sent with patch and delete requests for authentication.
 *
 * @returns inputs and buttons as modal that use the functionality defined in this component.
 */

const EditModal = ({
  editFin,
  editEng,
  setEdit,
  fetchAll,
  filterValue,
  fetchByTag,
  token,
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

  /**
   * Async function that uses axios.patch to update fin_eng table in the database.
   * Sends with the request the new english and finnish and also the old ones to the data is
   * updated in correct rows in the database table. Also sends JWT access token for authentication.
   * @param  f is the edited finnish translation that is sent to the database.
   * @param  e is the edited english translation that is sent to the database.
   */

  const saveEdit = async (f, e) => {
    try {
      await axios.patch("/translations", {
        english: memoeng,
        finnish: memofin,
        newEnglish: e,
        newFinnish: f,
        token: token,
      });
      if (filterValue === "Kaikki sanat" || filterValue.length === 0) {
        await fetchAll();
      } else {
        await fetchByTag(filterValue);
      }
      setMemoEng("");
      setMemoFin("");

      setEdit(false);
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Async function that uses axios.delete to send delete request to backend. Sends finnish and
   * english information and also JWT access token for authentication.
   * @param  f finnish the word to be deleted.
   * @param  e english for the word to be deleted.
   */

  const deleteWord = async (f, e) => {
    try {
      let what = await axios.delete("/translations", {
        data: { finnish: { f }, english: { e }, token: token },
      });

      console.log(what);

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
