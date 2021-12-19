import { useState, useEffect } from "react";

import Select from "react-select";
const axios = require("axios").default;

const AddWords = ({ setWords, fetchAll }) => {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [tag, setTag] = useState("");
  const [tagArray, setTagArray] = useState([]);

  const fetchTags = async () => {
    try {
      var response = await axios.get("/tags");

      var mapped = response.data.map(({ tag }) => (
        <div className="Tags">{tag}</div>
      ));
      setTagArray(mapped);
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
    setTag(e.target.value);
  };

  const SaveWord = async () => {
    try {
      await axios.post("/translations", {
        finnish: fin,
        english: eng,
        tag: tag,
      });
      setFin("");
      setEng("");
      setTag("");
      fetchAll();
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
      <Select options={tagArray} placeholder="Valitse tagi" />
      <button
        onClick={() => SaveWord()}
        style={{ display: "block" }}
        className="AddButton"
        type="submit"
      >
        Lisää sana tietokantaan
      </button>
    </div>
  );
};

export default AddWords;
