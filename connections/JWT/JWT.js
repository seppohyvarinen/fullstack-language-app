const jwt = require("jsonwebtoken");
const createTokens = (user) => {
  console.log("user: " + user);
  const accessToken = jwt.sign(
    { payload: { username: user.username } },
    "jwtsecret"
  );

  console.log(accessToken);

  return accessToken;
};

const validateToken = (req, res, next) => {
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
