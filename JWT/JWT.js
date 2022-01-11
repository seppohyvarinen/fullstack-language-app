const jwt = require("jsonwebtoken");

/**
 * This function creates a new JWT access token used for authentication
 * @param {Object} user contains username used as payload in creating a new token
 * @returns {String} the access token
 */
const createTokens = (user) => {
  const accessToken = jwt.sign(
    { payload: { username: user.username } },
    "jwtsecret"
  );

  console.log(accessToken);

  return accessToken;
};

/**
 * This function is used as middleware in functions that modify the database in any manner. The function verifies that
 * the received token matches the access token created at the server side.
 * @param {Object} req the request object
 * @param {*} res response object
 * @param {*} next next function to move to next middleware/function.
 * @returns next() if validation is succesful, otherwise statuscode 400.
 */

const validateToken = (req, res, next) => {
  console.log("body: " + req);
  console.log("token: " + req.body.token);
  const accessToken = req.body.token;

  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated" });
  }

  try {
    const validateToken = jwt.verify(accessToken, "jwtsecret");

    if (validateToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error: err });
  }
};
module.exports = { createTokens, validateToken };
