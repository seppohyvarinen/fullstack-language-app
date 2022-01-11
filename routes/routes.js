const express = require("express");

var translations = express.Router();

var connections = require("../connections/connections.js");

const { createTokens, validateToken } = require("../connections/JWT/JWT.js");

translations.use(tagFilter);

translations.get("/", async (req, res) => {
  console.log("was this called");

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

translations.post("/", validateToken, async (req, res) => {
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

  try {
    let save = await connections.saveTag(tmp);
    res.statusCode = 201;
    res.send(save);
  } catch (error) {
    res.statusCode = 400;
    res.send(`${res.statusCode} Bad Request: ${error}`);
  }
});

translations.post("/auth", async (req, res) => {
  let tmp = req.body;

  console.log("req: " + tmp);

  try {
    let auth = await connections.authenticate(tmp);

    console.log("auth: " + auth);
    if (auth.length !== 0) {
      const accessToken = createTokens(tmp);

      console.log(accessToken);

      res.json({ token: accessToken });
    } else {
      res.send("false");
    }
  } catch (error) {
    res.statusCode = 401;
    res.send(`${res.statusCode} Bad Request: ${error}`);
  }
});

translations.patch("/", async (req, res) => {
  let word = req.body;

  try {
    var response = await connections.editWord(word);

    res.statusCode = 200;
    res.end();
  } catch (error) {
    res.statusCode = 404;
    res.send({ msg: error });
  }
});

translations.delete("/", async (req, res) => {
  console.log("inside delete");
  let word = req.body;
  console.log(word);
  try {
    var response = await connections.deleteWord(word);

    res.statusCode = 204;
    res.end();
  } catch (error) {
    res.statusCode = 404;
    res.send({ msg: error });
  }
});

async function tagFilter(req, res, next) {
  const tag = req.query.tag;

  if (tag !== undefined) {
    try {
      var response = await connections.findByTag(tag);
      res.statusCode = 201;
      res.send(response);
    } catch (error) {
      res.statusCode = 400;
      res.send(`${res.statusCode} Bad Request: ${error}`);
    }
  } else {
    next();
    console.log("why here");
  }
}

module.exports = translations;
