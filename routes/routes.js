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

translations.get("/tags", async (req, res) => {
  console.log("here");
  try {
    let tags = await connections.findTags();
    res.send(tags);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

translations.post("/", async (req, res) => {
  let tmp = req.body;

  try {
    let save = await connections.save(tmp);
    res.statusCode = 201;
    res.send(save);
  } catch (error) {
    res.statusCode = 400;
    res.send(`${res.statusCode} Bad Request: ${error}`);
  }
});

translations.post("/tag", async (req, res) => {
  let tmp = req.body;
  console.log("taghere");

  try {
    let save = await connections.saveTag(tmp);
    res.statusCode = 201;
    res.send(save);
  } catch (error) {
    res.statusCode = 400;
    res.send(`${res.statusCode} Bad Request: ${error}`);
  }
});

module.exports = translations;
