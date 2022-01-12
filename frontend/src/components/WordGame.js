import { useState, useEffect } from "react";
import GameScreen from "./GameScreen";

const axios = require("axios").default;

/**
 * This component fetches tags from the database and then maps them in to divs that are rendered to player
 * as "topics" player can learn words from.
 * @param {Number} gameMode is the state that defines whether game is played in fin-eng or eng-fin mode.
 * @param {Number} amount is the amount of words used in the game.
 * @returns when gameOn state is false, the menu, otherwise the GameScreen component.
 */

const WordGame = ({ gameMode, amount }) => {
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [gameOn, setGameOn] = useState(false);

  /**
   * This function handles starting the game, it sets the gameOn state to true and sets the keyword that will be passed
   * as props to the GameScreen component.
   * @param {String} tag acts as keyword for the GameScreen so it knows the tag the fetch needs to be done by.
   */

  const handleGameStart = (tag) => {
    setKeyword(tag);
    setGameOn(true);
  };

  /**
   * Async function that fetches tags from the database with axios.get. Tags are then mapped as divs
   * to be rendered for the user.
   */

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

  /**
   * By default all tags are fetched as useEffect for the user.
   */

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <>
      {gameOn && (
        <GameScreen
          keyword={keyword}
          gameMode={gameMode}
          amount={amount}
          back={setGameOn}
        />
      )}
      {!gameOn && (
        <div className="GameMenu">
          <div className="MenuInfo">
            Valitse aihe mistä haluat opetella sanoja!
          </div>
          <div className="TagList">{tags}</div>
        </div>
      )}
    </>
  );
};

export default WordGame;
