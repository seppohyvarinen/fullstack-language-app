import { useState, useEffect } from "react";
import AddWords from "./AddWords";
import Select from "react-select";
import EditModal from "./EditModal";

const axios = require("axios").default;

/**
 * This componen is the base component of the teacher view. User can here modify the database, add translations, edit translations, add tags
 * and also delete words. The component renders 2 sub components AddWords and EditModal that participate in providing
 * this functionality.
 * @param {Number} Setmode is the mode select setter inherited from Home component. Used here to return back.
 * @param {String} token is the JWT token received upon succesful login. Used when making post/patch/delete requests to
 * database for authentication.
 * @param setToken is the setter for token state. Is set to empty string on logout.
 * @returns Components EditModal, Addwords and all necessary buttons and arrays.
 */

const TeacherView = ({ Setmode, token, setToken }) => {
  const [words, setWords] = useState([]);
  const [tagsForFilter, setTagsForFilter] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editFin, setEditFin] = useState("");
  const [editEng, setEditEng] = useState("");

  /**
   * This function handles initializing the edit of a translation. It sets the states for finnish and english and also sets
   * EditModal state true so EditModal is rendered.
   * @param {String} f is the finnish translation received for editing.
   * @param {String} e is the english translation received for editing.
   */

  const handleEdit = (f, e) => {
    setEditFin(f);
    setEditEng(e);
    setEditModal(true);
  };

  /**
   * Async function that fetches all translations from the database. Uses axios.get.
   * Sets the response array to Words state as divs containing the translations.
   */

  const fetchAll = async () => {
    try {
      var response = await axios.get("/translations");

      var mapped = response.data.map(({ finnish, english }) => (
        <div
          className="Words"
          title="Klikkaa muokataksesi tai poistaaksesi sana"
          onClick={() => handleEdit(finnish, english)}
        >
          {finnish + " - " + english}
        </div>
      ));
      setWords(mapped);
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Async function that fetches translations based on their tag. Uses axios.get. Response is then mapped as divs
   * and set to Words state.
   * @param {Object} t is the object containing tag information.
   */

  const fetchByTag = async (t) => {
    try {
      var response = await axios.get("/translations", {
        params: {
          tag: t.value,
        },
      });
      var mapped = response.data.map(({ finnish, english }) => (
        <div
          className="Words"
          title="Klikkaa muokataksesi tai poistaaksesi sana"
          onClick={() => handleEdit(finnish, english)}
        >
          {finnish + " - " + english}
        </div>
      ));

      setWords(mapped);
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Handles filtering of the words rendered to user.
   * @param {} e is the filter value.
   */

  const handleFilter = (e) => {
    console.log(e);
    setFilterValue(e);
    handleFetch(filterValue);
  };

  /**
   * Handles the fetch according to tag information it receives. Either calls fetchAll or fetchByTag
   * based on this information.
   * @param {Object} t contains tag information.
   */

  const handleFetch = (t) => {
    t.value === "Kaikki sanat" ? fetchAll() : fetchByTag(t);
  };

  /**
   * By default useEffect fetches all translations for the user to be viewed.
   */

  useEffect(() => {
    fetchAll();
  }, []);

  const handleLogout = () => {
    setToken("");
    Setmode(0);
  };

  return (
    <div>
      {editModal && (
        <EditModal
          fetchAll={fetchAll}
          fetchByTag={fetchByTag}
          editFin={editFin}
          editEng={editEng}
          setEdit={setEditModal}
          filterValue={filterValue}
          token={token}
        />
      )}
      <div className="InfoSection">
        <button className="Returnbtn" onClick={() => handleLogout()}>
          &#8592;
          <br /> Takaisin
        </button>{" "}
        <table className="TeacherInfo">
          <p>
            {" "}
            Opettaja-tilassa voit lisätä uusia käännöksiä tietokantaan. Kirjoita
            sana suomeksi sekä englanniksi ja valitse sanalle sopiva luokka.
            Paina "Lisää tietokantaan" - nappia tallentaaksesi käännöksen.
          </p>
        </table>
      </div>

      <div className="Teacherview">
        <div className="AddWords">
          <AddWords
            setWords={setWords}
            fetchAll={fetchAll}
            setFilter={setTagsForFilter}
            handleFetch={handleFetch}
            filterValue={filterValue}
            token={token}
          />
        </div>

        <div className="TranslationList">
          {" "}
          <Select
            options={tagsForFilter}
            placeholder="Suodata..."
            onChange={handleFilter}
            value={filterValue}
          />
          <button onClick={() => handleFetch(filterValue)}>
            Etsi tietokannasta
          </button>
          {words}
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
