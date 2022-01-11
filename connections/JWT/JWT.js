const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken =
    ({ username: user.username },
    "jwtsecret",
    {
      expires_in: 400,
    });

  return accessToken;
};
module.exports = { createTokens };
