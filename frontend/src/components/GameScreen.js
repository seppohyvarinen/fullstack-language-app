import { useState, useEffect } from "react";

const axios = require("axios").default;

const GameScreen = ({ keyword }) => {
  const [words, setWords] = useState([]);
  const [buttonPress, setButtonPress] = useState([]);

  const fetchByTag = async (k) => {
    try {
      var response = await axios.get("/translations", {
        params: {
          tag: k,
        },
      });
      var mapped = response.data.map(({ finnish, english }) => (
        <div className="Words">{finnish + " - " + english}</div>
      ));

      setWords(mapped);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="modalBG">
      {" "}
      <div className="Screen">
        <button onClick={() => fetchByTag(keyword)}>start the game</button>

        {buttonPress && words}
      </div>
    </div>
  );
};

export default GameScreen;
