import { useState, useEffect, useRef } from "react";

const axios = require("axios").default;

const GameScreen = ({ keyword, gameMode }) => {
  const [words, setWords] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [index, setIndex] = useState(0);
  const correct = useRef("");

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

  const Game = (mode) => {
    var question = [];
    var answers = [];

    if (mode === 1) {
      correct.current = words[index].english;
      console.log(correct.current);
      question = words.map(({ finnish }) => (
        <div className="Question">{finnish}</div>
      ));

      answers = words.map(({ english }) => (
        <div className="Answer" onClick={() => next(english)}>
          {english}
        </div>
      ));
    } else {
      correct.current = words[index].finnish;
      console.log(correct.current);

      question = words.map(({ english }) => (
        <div className="Question">{english}</div>
      ));

      answers = words.map(({ finnish }) => (
        <div className="Answer" onClick={() => next(finnish)}>
          {finnish}
        </div>
      ));
    }

    return (
      <div>
        <div>{question[index]}</div>
        <div>{answers}</div>
      </div>
    );
  };

  const next = (a) => {
    if (a === correct.current) {
      alert("yep");
      setIndex(index + 1);
    } else {
      alert(a);
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
        {gameOn && Game(gameMode)}
      </div>
    </div>
  );
};

export default GameScreen;
