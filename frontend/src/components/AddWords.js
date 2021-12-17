import { useState } from "react";
const axios = require("axios").default;

const AddWords = ({ setWords }) => {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [tag, setTag] = useState("");

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
    } catch (error) {
      alert(error);
    }
  };

  const Modal = () => {
    return (
      <div>
        <h2> Suomeksi </h2>
        <input type={"text"} onChange={handleFin} value={fin}></input>
        <h2> In english </h2>
        <input type={"text"} onChange={handleEng} value={eng}></input>
        <h2> Tag </h2>
        <input type={"text"} onChange={handleTag} value={tag}></input>
        <button onClick={() => SaveWord}></button>
      </div>
    );
  };

  return <div>Com{Modal}</div>;
};

export default AddWords;
