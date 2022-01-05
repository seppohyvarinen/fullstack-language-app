import { useState, useEffect } from "react";
import AddWords from "./AddWords";
import Select from "react-select";

const axios = require("axios").default;

const TeacherView = ({ Setmode }) => {
  const [words, setWords] = useState([]);
  const [tagsForFilter, setTagsForFilter] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const fetchAll = async () => {
    try {
      var response = await axios.get("/translations");

      var mapped = response.data.map(({ finnish, english }) => (
        <div className="Words">{finnish + " - " + english}</div>
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
        <div className="Words">{finnish + " - " + english}</div>
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
