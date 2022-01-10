import { useState } from "react";

const axios = require("axios").default;

const Login = ({ Setmode }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAuth = async () => {
    try {
      var response = await axios.post("/translations/auth", {
        username: userName,
        password: password,
      });
      if (response.data.length !== 0) {
        Setmode(3);
      }
    } catch (error) {
      alert("wssup");
    }
  };
  return (
    <div className="modalBG">
      <div className="LoginScreen">
        {" "}
        <div className="EditInputs">
          <h2> Käyttäjätunnus </h2>
          <input
            type={"text"}
            onChange={handleUsername}
            value={userName}
          ></input>
          <h2> Salasana </h2>
          <input
            type={"text"}
            onChange={handlePassword}
            value={password}
          ></input>
        </div>
        <div className="EditButtons">
          <button onClick={() => handleAuth()}>Kirjaudu</button>
          <button onClick={() => Setmode(0)}>Takaisin</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
