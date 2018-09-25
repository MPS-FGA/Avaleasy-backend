const jwt = require('jsonwebtoken');

// middleware for authentication check
function verifyToken(req, res, next) {
  if (typeof req.headers.authorization !== 'string') {
    res.sendStatus(400);
    return;
  }

  const tokens = req.headers.authorization.split(' ');

  if (tokens.length < 2) {
    res.sendStatus(400);
    return;
  }

  const token = tokens[1];

  const payload = jwt.decode(token, 'secretkey');
  if (!payload.sub) {
    res.status(401).send({
      message: 'Authentication failed',
    });
  }
  next();
}

module.exports = verifyToken;
