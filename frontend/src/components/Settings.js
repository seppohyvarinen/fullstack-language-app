const Settings = ({ setColor }) => {
  return (
    <div className="Settings">
      <h2>Vaihda taustaväriä: </h2>

      <button onClick={() => setColor("default")}>Oletus</button>
      <button onClick={() => setColor("morningLight")}>Morning Light</button>
    </div>
  );
};

export default Settings;
