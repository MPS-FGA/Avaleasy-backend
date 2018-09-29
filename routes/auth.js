const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = require('../app');
const Teachers = require('../models/teacher.model');
const hashPassword = require('../utils/password');

mongoose.connect('mongodb://db:27017/base');

const router = express();

// POST /auth/sign-in
router.post('/sign-in', (req, res) => {
  Teachers.findOne({ email: req.body.email })
    .then((teacher) => {
      if (teacher.password === hashPassword(req.body.password).passwordHash) {
        jwt.sign({ teacher }, app.SECRET_KEY, (err, token) => {
          if (err) {
            res.json({
              err,
            });
          } else {
            res.json({
              token,
            });
          }
        });
      } else {
        res.sendStatus(403);
      }
    })
    .catch((err) => {
      res.json({ err });
    });


  // const teacher = Teachers.find({ email: req.body.email }, (err) => {
  //   if (err) {
  //     res.json({
  //       err,
  //     });
  //   }
  // });
  // // validations
  // if (teacher) {
  //   if (teacher.password === hashPassword(req.body.password).passwordHash) {
  //     jwt.sign({ teacher }, app.SECRET_KEY, (err, token) => {
  //       if (err) {
  //         res.json({
  //           err,
  //         });
  //       } else {
  //         res.json({
  //           token,
  //         });
  //       }
  //     });
  //   } else {
  //     res.sendStatus(403);
  //   }
  // } else {
  //   res.send(404);
  // }
});

// router.post('/sign-out', (req, res) => {

// });

module.exports = router;
