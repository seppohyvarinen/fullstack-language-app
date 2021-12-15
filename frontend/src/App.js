import { useState } from "react";

const axios = require("axios").default;

function App() {
  const [test, setTest] = useState("info comes here");

  const getAll = async () => {
    console.log(test);

    try {
      const response = await axios.get("/translations");
      setTest(response.data[0].finnish);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <p>{test}</p>
      <button onClick={() => getAll()}></button>
    </div>
  );
}

export default App;
