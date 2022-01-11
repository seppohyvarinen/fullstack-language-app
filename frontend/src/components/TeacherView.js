import { useState, useEffect } from "react";
import AddWords from "./AddWords";
import Select from "react-select";
import EditModal from "./EditModal";

const axios = require("axios").default;

const TeacherView = ({ Setmode, token }) => {
  const [words, setWords] = useState([]);
  const [tagsForFilter, setTagsForFilter] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editFin, setEditFin] = useState("");
  const [editEng, setEditEng] = useState("");

  const handleEdit = (f, e) => {
    setEditFin(f);
    setEditEng(e);
    setEditModal(true);
  };

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
      console.log("mapped: " + mapped);
      setWords(mapped);
    } catch (error) {
      alert(error);
    }
  };

  const handleFilter = (e) => {
    console.log(e);
    setFilterValue(e);
    handleFetch(filterValue);
  };

  const handleFetch = (t) => {
    t.value === "Kaikki sanat" ? fetchAll() : fetchByTag(t);
  };

  useEffect(() => {
    fetchAll();
  }, []);

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
        <button className="Returnbtn" onClick={() => Setmode(0)}>
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
