import { useState } from "react";

const axios = require("axios").default;

/**
 * This component handles the user login for the application. User must enter correct username and password to login.
 * @param {Number} Setmode state of Home component that defines which area of the app is rendered
 * @param {String} setToken setter for the token state, in Login component if login is succesful token is set to Home components token state.
 * @returns a modal containing all the inputs and buttons needed for login.
 */

const Login = ({ Setmode, setToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  /**
   * This function handles authentication when called. It uses axios.post call to send username and password.
   * It receives a JWT token as response which is then set to state.
   */

  const handleAuth = async () => {
    try {
      var response = await axios.post("/translations/auth", {
        username: userName,
        password: password,
      });
      console.log(response.data.token);
      if (response.data.token) {
        setToken(response.data.token);
        Setmode(3);
      } else {
        alert("Tarkista käyttäjätunnus ja salasana");
      }
    } catch (error) {
      alert("wssup");
    }
  };
  return (
    <div className="modalBG">
      <div className="LoginScreen">
        Anna käyttäjätunnus ja salasana kirjautuaksesi opettaja-tilaan
        <div className="EditInputs">
          <h2> Käyttäjätunnus </h2>

          <input
            type={"text"}
            onChange={handleUsername}
            value={userName}
          ></input>
          <h2> Salasana </h2>
          <input
            type={"password"}
            onChange={handlePassword}
            value={password}
          ></input>
        </div>
        <div className="EditButtons" id="Login">
          <button onClick={() => handleAuth()}>Kirjaudu</button>
          <button onClick={() => Setmode(0)}>Takaisin</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
