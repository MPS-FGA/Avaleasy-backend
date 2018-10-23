const jwt = require('jsonwebtoken');
const tokenHandler = require('./auth.tokenHandler');

const verifyRequestAndAuth = (req, res, next) => {
  const token = tokenHandler(req);
  const decoded = jwt.decode(token, 'secretkey');
  if (!decoded.sub) {
    res.status(401).send({
      message: 'Permission denied',
    });
  }

  if (req.body.teacherId !== decoded.payload.id) {
    res.status(401).send({
      message: 'Permission denied',
    });
  }

  next();
};

module.exports = verifyRequestAndAuth;
