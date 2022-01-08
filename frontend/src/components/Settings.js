const Settings = ({ amount, setAmount }) => {
  return (
    <div className="Settings">
      <div className="Amountset">
        Kysymysten määrä:
        <input
          type="radio"
          value="5"
          name="amount"
          checked={amount === 5 ? "checked" : null}
          onClick={() => setAmount(5)}
        />{" "}
        5
        <input
          type="radio"
          value="7"
          name="amount"
          checked={amount === 7 ? "checked" : null}
          onClick={() => setAmount(7)}
        />{" "}
        7
        <input
          type="radio"
          value="10"
          name="amount"
          checked={amount === 10 ? "checked" : null}
          onClick={() => setAmount(10)}
        />{" "}
        10
      </div>
    </div>
  );
};

export default Settings;
