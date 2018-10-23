const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher');

const router = express();

mongoose.connect('mongodb://db:27017/base');

// POST /auth/sign-in
router.post('/sign-in', (req, res, next) => {
  Teacher.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json(404, {
          msg: 'user not found',
        });
      }
      bcrypt.compare(req.body.password, user.password, (result, err) => {
        if (!result) {
          return res.json(401, {
            error: 'Wrong credentials',
          });
        }
        if (err) {
          return res.json(500, { err });
        }
        const token = jwt.sign(
          { teacherId: user._id, name: user.name, email: user.email },
          'secretkey',
          { expiresIn: '1h' },
        );
        return res.json(200, {
          token,
        });
      });
      return true;
    });
});

module.exports = router;
