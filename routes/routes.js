const express = require("express");

var translations = express.Router();

var connections = require("../connections/connections.js");

translations.get("/", async (req, res) => {
  console.log("here");
  try {
    let all = await connections.findAll();
    res.send(all);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

module.exports = translations;
