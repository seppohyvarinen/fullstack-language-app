import { useState, useEffect } from "react";

const axios = require("axios").default;

const GameScreen = ({ keyword }) => {
  const [words, setWords] = useState([]);

  const fetchByTag = async (k) => {
    try {
      var response = await axios.get("/translations", {
        params: {
          tag: k,
        },
      });
      setWords(response.data[0]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="modalBG">
      {" "}
      <div className="Screen">
        <button onClick={() => fetchByTag(keyword)}>start the game</button>
        {words}
      </div>
    </div>
  );
};

export default GameScreen;
