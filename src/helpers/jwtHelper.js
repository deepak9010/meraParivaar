const jwt = require('jsonwebtoken');
const config = require('../config');

const signAccessToken = (payload) => jwt.sign(payload, config.jwt.secret, {
  expiresIn: config.jwt.expiresIn,
});

const verifyAccessToken = (token) => jwt.verify(token, config.jwt.secret);

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
