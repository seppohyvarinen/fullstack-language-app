const Results = ({ score, amount }) => {
  var reaction = "";
  if (score === amount) {
    reaction = "Kaikki oikein! Aivan mahtavaa";
  } else if (amount - score === 1) {
    reaction = "Loistavaa, vain yksi meni väärin. Kokeile vielä kerran!";
  } else if (amount - score === 2) {
    reaction = "Suurin osa meni oikein, hyvä! Koeta vielä uudelleen!";
  } else {
    reaction = "Harjoitus tekee mestarin!";
  }

  return (
    <div className="ResultScreen">
      <div className="ResultConstant">
        Sait {score} / {amount} pistettä!
      </div>
      <div className="ResultReaction">{reaction}</div>
    </div>
  );
};

export default Results;
