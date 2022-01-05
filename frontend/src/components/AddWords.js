import { useState, useEffect } from "react";

import Select from "react-select";
const axios = require("axios").default;

const AddWords = ({
  setWords,
  fetchAll,
  setFilter,
  handleFetch,
  filterValue,
}) => {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [newTag, setNewTag] = useState("");

  const fetchTags = async () => {
    try {
      var response = await axios.get("/translations/tags");

      let temp = [];
      let filterTemp = [];
      filterTemp.push({ label: "Kaikki sanat", value: "Kaikki sanat" });

      var mapped = await response.data.map(({ tag }) => tag);

      for (var tag of mapped) {
        temp.push({ label: tag, value: tag });
        filterTemp.push({ label: tag, value: tag });
      }

      setTagArray(temp);

      setFilter(filterTemp);
      console.log(tagArray);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleFin = (e) => {
    setFin(e.target.value);
  };

  const handleEng = (e) => {
    setEng(e.target.value);
  };

  const handleTag = (e) => {
    console.log(e);
    setTagInput(e);
  };

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  const SaveWord = async () => {
    try {
      await axios.post("/translations", {
        finnish: fin,
        english: eng,
        tag: tagInput.label,
      });
      setFin("");
      setEng("");
      setTagInput("");
      handleFetch(filterValue);
    } catch (error) {
      alert(error);
    }
  };

  const SaveNewTag = async () => {
    try {
      await axios.post("/translations/tag", {
        tag: newTag,
      });

      setNewTag("");

      fetchTags();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2> Suomeksi </h2>{" "}
      <input type={"text"} onChange={handleFin} value={fin}></input>
      <h2> In english </h2>
      <input type={"text"} onChange={handleEng} value={eng}></input>
      <h2> Tag </h2>
      <Select
        options={tagArray}
        placeholder="Valitse tagi"
        onChange={handleTag}
        value={tagInput}
      />
      <button onClick={() => SaveWord()} className="AddButton" type="submit">
        Lisää sana tietokantaan
      </button>
      <h2>Ei löydy sopivaa tagia? Lisää tästä uusi</h2>
      <input type={"text"} onChange={handleNewTag} value={newTag}></input>
      <button onClick={() => SaveNewTag()}>Lisää tagi tietokantaan</button>
    </div>
  );
};

export default AddWords;
