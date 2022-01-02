import { useState, useEffect } from "react";
import GameScreen from "./GameScreen";

const axios = require("axios").default;

const WordGame = ({ gameMode }) => {
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [gameOn, setGameOn] = useState(false);

  const handleGameStart = (tag) => {
    setKeyword(tag);
    setGameOn(true);
  };

  const fetchTags = async () => {
    try {
      var response = await axios.get("/translations/tags");

      var mapped = response.data.map(({ tag }) => (
        <div className="Gametag" onClick={() => handleGameStart(tag)}>
          {tag}
        </div>
      ));
      setTags(mapped);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <>
      {gameOn && <GameScreen />}
      {!gameOn && (
        <div className="GameMenu">
          You are playing with game mode {gameMode}
          game screen is on {gameOn}
          keyword is {keyword}
          <div className="TagList">{tags}</div>
        </div>
      )}
    </>
  );
};

export default WordGame;
