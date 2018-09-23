const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Teachers = require('../models/teacher.model')
mongoose.connect('mongodb://db:27017/base');

const router = express();

// POST /auth/sign-in
router.post('/sign-in', (req, res) => {
  Teachers.find({email: req.body.email}, (err, result) => {
    if (!err && typeof result != undefined) {
      jwt.sign({user: result}, 'secretkey', (err, token) => {
        if (err) {
          res.json({
            error
          });
        }
        else {
          res.json({
            token
          });
        }
      });
    }    
  });
});

router.post('/sign-out', (req, res) => {
  
});

module.exports = router;
