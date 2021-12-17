import { useState } from "react";
const axios = require("axios").default;

const AddWords = ({ setWords }) => {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [tag, setTag] = useState("");

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
        <input type={"text"}></input>
        <input type={"text"}></input>
        <input type={"text"}></input>
        <button onClick={() => SaveWord}></button>
      </div>
    );
  };

  return <div>Com{Modal}</div>;
};

export default AddWords;
