const jwt = require('jsonwebtoken');
const tokenHandler = require('./auth.tokenHandler');

// middleware for authentication check
function verifyToken(req, res, next) {
  const token = tokenHandler(req);
  const payload = jwt.decode(token, 'secretkey');
  if (!payload) {
    res.status(401).send({
      message: 'Permission denied',
    });
  }
  next();
}

module.exports = verifyToken;
