import { useState, useEffect } from "react";

const axios = require("axios").default;

const GameScreen = ({ keyword, gameMode }) => {
  const [words, setWords] = useState([]);
  const [gameOn, setGameOn] = useState(false);

  const handleStartGame = async (k) => {
    try {
      var response = await axios.get("/translations", {
        params: {
          tag: k,
        },
      });
      var mapped = response.data.map(({ finnish, english }) => ({
        finnish: finnish,
        english: english,
      }));

      setWords(mapped);
      setGameOn(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="modalBG">
      {" "}
      <div className="Screen">
        {!gameOn && (
          <div className="Instructions">
            <button onClick={() => handleStartGame(keyword)}>
              start the game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
