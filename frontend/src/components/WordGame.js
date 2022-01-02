import { useState, useEffect } from "react";

const axios = require("axios").default;

const WordGame = ({ gameMode }) => {
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [gameOn, setGameOn] = useState(false);

  const fetchTags = async () => {
    try {
      var response = await axios.get("/translations/tags");

      var mapped = response.data.map(({ tag }) => (
        <div className="Gametag">{tag}</div>
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
    <div className="GameMenu">
      You are playing with game mode {gameMode}
      <div className="TagList">{tags}</div>
    </div>
  );
};

export default WordGame;
