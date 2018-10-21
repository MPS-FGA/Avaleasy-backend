const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Teachers = require('../models/teacher');

// const app = require('../app');
// const hashPassword = require('../utils/password');

mongoose.connect('mongodb://db:27017/base');

const router = express();

// POST /auth/sign-in
router.post('/sign-in', (req, res, next) => {
  Teachers.findOne({ email: req.body.email })
    .then((teacher) => {
      if (!teacher) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      return bcrypt.compare(req.body.password, teacher.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "auth failed",
        })
      }
      const token = jwt.sign(
        {email: teacher.email, userId: teacher._id},
        'secretkey',
        { expiresIn: '1h' }
      );
      res.statusCode(200).json({
        token,
      });
    })
    .catch((err) => {
      res.json({ err });
    });
});


module.exports = router;
