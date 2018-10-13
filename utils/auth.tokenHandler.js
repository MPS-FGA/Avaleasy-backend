const handleToken = (req) => {
  if (typeof req.headers.authorization !== 'string') {
    return -1;
  }
  const tokens = req.headers.authorization.split(' ');
  if (tokens.length < 2) {
    return -1;
  }
  return tokens[1];
};

module.exports = handleToken;
