import { useState, useEffect, useRef } from "react";

const axios = require("axios").default;

const GameScreen = ({ keyword, gameMode, amount }) => {
  const [words, setWords] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
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

      if (mapped.length > amount) {
        var cut = ArrayCutter(mapped, amount);
        console.log(cut);
        setWords(cut);
      } else {
        setWords(mapped);
      }

      setGameOn(true);
    } catch (error) {
      alert(error);
    }
  };

  const Game = (mode) => {
    var question = [];
    var answers = [];

    mode === 1
      ? (correct.current = words[index].english)
      : (correct.current = words[index].finnish);

    question = words.map(({ finnish, english }) => {
      if (mode === 1) {
        return <div className="Question">{finnish}</div>;
      } else {
        return <div className="Question">{english}</div>;
      }
    });

    answers = words.map(({ finnish, english }) => {
      if (mode === 2) {
        return (
          <div className="Answer" onClick={() => next(finnish)}>
            {finnish}
          </div>
        );
      } else {
        return (
          <div className="Answer" onClick={() => next(english)}>
            {english}
          </div>
        );
      }
    });

    return (
      <div>
        <div className="Score">{score}</div>
        <div>{question[index]}</div>
        <div>{shuffle(answers)}</div>
      </div>
    );
  };

  const next = (a) => {
    if (a === correct.current) {
      setScore(score + 1);
    }
    setIndex(index + 1);
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

const ArrayCutter = (arr, size) => {
  var indexes = [];
  var newArray = [];
  var max = arr.length;
  for (var i = 0; i < size; i++) {
    let newIndex = Math.floor(Math.random() * max);
    while (indexes.includes(newIndex)) {
      newIndex = Math.floor(Math.random() * max);
    }
    indexes.push(newIndex);
  }
  console.log(arr);
  console.log(indexes);

  for (var i = 0; i < indexes.length; i++) {
    newArray.push(arr[indexes[i]]);
  }

  return newArray;
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default GameScreen;
