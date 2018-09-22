const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Teachers = require('../models/teacher.model')
mongoose.connect('mongodb://db:27017/base');

// POST sign in or login
router.post('/sign-in', (req, res) => {
  Teachers.find({username: req.body.username}, (err, result) => {
    if (!err && typeof result != undefined) {
      jwt.sign({user: result}, 'secretkey', (err, token) => {
        res.json({
          token
        })
      });
    }    
  });
});

module.exports = router;
