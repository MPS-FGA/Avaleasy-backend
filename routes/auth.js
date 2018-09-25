const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Teachers = require('../models/teacher.model')
const hashPassword = require('../utils/password');

mongoose.connect('mongodb://db:27017/base');

const router = express();

// POST /auth/sign-in
router.post('/sign-in', (req, res) => {
  var teacher = Teachers.find({ email: req.body.email }, (err, req) => {
    if (err) {
      res.json({
        err
      });
    }
  });
  // validations
  if (teacher) {
    if (teacher.password === hashPassword(req.body.password).passwordHash) {
      jwt.sign({teacher}, SECRET_KEY, (err, token) => {
        if (err) {
          res.json({
            err
          });
        }
        else {
          res.json({
            token
          });
        }
      });
    }
    else {
      res.sendStatus(403);  
    }
  }
  else {
    res.send(404);
  }
});

router.post('/sign-out', (req, res) => {
  
});

module.exports = router;
