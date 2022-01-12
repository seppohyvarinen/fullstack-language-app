const express = require("express");

var translations = express.Router();

var connections = require("../connections/connections.js");

const { createTokens, validateToken } = require("../JWT/JWT.js");

translations.use(tagFilter);

/**
 * This function calls the database function that fetches all translations from the database.
 */

translations.get("/", async (req, res) => {
  try {
    let all = await connections.findAll();
    res.send(all);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * This functions calls the database function that fetches all the tags from the database.
 */

translations.get("/tags", async (req, res) => {
  try {
    let tags = await connections.findTags();
    res.send(tags);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * This function calls a database function that saves new translation to database.
 * Uses validateToken middleware to ensure authentication.
 */

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

/**
 * This function calls the database function that saves a new tag to database.
 * Uses validateToken middleware to ensure authentication.
 */

translations.post("/tag", validateToken, async (req, res) => {
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

/**
 * This function calls the database function that checks that the received user
 * and password can be found from the database.
 */

translations.post("/auth", async (req, res) => {
  let tmp = req.body;

  try {
    let auth = await connections.authenticate(tmp);

    if (auth.length !== 0) {
      const accessToken = createTokens(tmp);

      res.json({ token: accessToken });
    } else {
      res.send("false");
    }
  } catch (error) {
    res.statusCode = 401;
    res.send(`${res.statusCode} Bad Request: ${error}`);
  }
});

/**
 * This function calls the database function that handles editing translations in the database.
 * Uses validateToken middleware to ensure authentication.
 */

translations.patch("/", validateToken, async (req, res) => {
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

/**
 * This function calls the database function that handles deleting translations from the database.
 * Uses validateToken middleware to ensure authentication.
 */

translations.delete("/", validateToken, async (req, res) => {
  let word = req.body;

  try {
    var response = await connections.deleteWord(word);

    res.statusCode = 204;
    res.end();
  } catch (error) {
    res.statusCode = 404;
    res.send({ msg: error });
  }
});

/**
 * This function operates as middleware that checks if the get request from the frontend
 * contains tag information. If it does the function calls the database function that
 * fetches translations by tag, otherwise it calls next().
 */

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
  }
}

module.exports = translations;
