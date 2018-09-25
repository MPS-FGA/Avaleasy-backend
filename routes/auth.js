const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Teachers = require('../models/teacher.model')
const hashPassword = require('../utils/password');

mongoose.connect('mongodb://db:27017/base');

const router = express();

// POST /auth/sign-in
router.post('/sign-in', (req, res) => {
  var teacher = Teachers.find({ email: req.body.email, password: hashPassword(req.user.password) }, (err) => {
    if (err) {
      res.json({
        err
      });
    }
  });
  if (Object.getOwnPropertyNames(teacher).length === 0) {
    jwt.sign({teacher}, 'secretkey', (err, token) => {
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
    res.send(404);
  }
});

// router.post('/sign-in', (req, res) => {
//   res.sendStatus(200);
// });


router.post('/sign-out', (req, res) => {
  
});

module.exports = router;
