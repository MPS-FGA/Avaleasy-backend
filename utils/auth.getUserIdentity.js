const jwt = require('jsonwebtoken');
const tokenHandler = require('./auth.tokenHandler');

const getId = (req) => {
  const token = tokenHandler(req);
  const decoded = jwt.decode(token, 'secretkey');

  if (!decoded.sub) return -1;

  return decoded.payload.id;
};

module.exports = getId;
