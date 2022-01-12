import { useState, useEffect } from "react";

import Select from "react-select";
const axios = require("axios").default;

/**
 * Subcomponent for TeacherView. Handles logic and functions for sending post requests to database and re-fetching updated data.
 * @param setFilter is setter received as props from TeacherView component. It sets the filtervalue for filtering rendered words.
 * @param handleFetch is received as props so after adding words the word array can be re-fetched with updated words.
 * @param filterValue is filter value received as props so the re-fetch can be done with correct filter value.
 * @param token is the JWT token received as props so it can be sent with post requests.
 * @returns inputs and buttons that use the functions defined in this component to post data to database.
 */

const AddWords = ({ setFilter, handleFetch, filterValue, token }) => {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [newTag, setNewTag] = useState("");

  /**
   * Fetches all tags from the database. Tags are then mapped to tagArray state that is then passed to Select component
   * for user to select from when adding a new word.
   */

  const fetchTags = async () => {
    try {
      var response = await axios.get("/translations/tags");

      let temp = [];
      let filterTemp = [];
      filterTemp.push({ label: "Kaikki sanat", value: "Kaikki sanat" });

      var mapped = await response.data.map(({ tag }) => tag);

      for (var tag of mapped) {
        temp.push({ label: tag, value: tag });
        filterTemp.push({ label: tag, value: tag });
      }

      setTagArray(temp);

      setFilter(filterTemp);
      console.log(tagArray);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleFin = (e) => {
    setFin(e.target.value);
  };

  const handleEng = (e) => {
    setEng(e.target.value);
  };

  const handleTag = (e) => {
    console.log(e);
    setTagInput(e);
  };

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  /**
   * Async function that uses axios.post to save new translation to the database.
   * Sends in the request body finnish, english, tag and also the JWT access token, so the request
   * is validated in the backend.
   */

  const SaveWord = async () => {
    if (fin.length !== 0 && eng.length !== 0 && tagInput.length !== 0) {
      try {
        await axios.post("/translations", {
          finnish: fin,
          english: eng,
          tag: tagInput.label,
          token: token,
        });
        setFin("");
        setEng("");
        setTagInput("");
        handleFetch(filterValue);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Tarkista, että täytit kaikki kohdat!");
    }
  };

  /**
   * Async function that saves new tag to database with axios.post.
   * Sends with request the tag and JWT access token for authentication purposes.
   */

  const SaveNewTag = async () => {
    try {
      await axios.post("/translations/tag", {
        tag: newTag,
        token: token,
      });

      setNewTag("");

      fetchTags();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2> Suomeksi </h2>{" "}
      <input type={"text"} onChange={handleFin} value={fin}></input>
      <h2> In english </h2>
      <input type={"text"} onChange={handleEng} value={eng}></input>
      <h2> Tag </h2>
      <Select
        options={tagArray}
        placeholder="Valitse tagi"
        onChange={handleTag}
        value={tagInput}
      />
      <button onClick={() => SaveWord()} className="AddButton" type="submit">
        Lisää sana tietokantaan
      </button>
      <h2>Ei löydy sopivaa tagia? Lisää tästä uusi</h2>
      <input type={"text"} onChange={handleNewTag} value={newTag}></input>
      <button onClick={() => SaveNewTag()}>Lisää tagi tietokantaan</button>
    </div>
  );
};

export default AddWords;
