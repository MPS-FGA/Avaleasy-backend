const express = require('express');
const jwt = require('jsonwebtoken');

// middleware for authentication check
function verifyToken(req, res, next) {
  if (typeof req.headers.authorization !== 'string') {
    res.sendStatus(400);
    return;
  }

  var tokens = req.headers.authorization.split(' ');

  if (tokens.length < 2) {
    res.sendStatus(400);
    return;
  }

  var token = tokens[1];

  var payload = jwt.decode(token, "secretkey");
  if (!payload.sub) {
    res.status(401).send({
      message: 'Authentication failed'
    });
  }
  next();
};

module.exports = verifyToken;
