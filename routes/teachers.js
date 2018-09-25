const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Teachers = require('../models/teacher.model');
const hashPassword = require('../utils/password');
const authMiddleware = require('../auth.middleware');

mongoose.connect('mongodb://db:27017/base');

/* POST teachers. */
router.post('/new', (req, res, next) => {
  const teacher = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const password = hashPassword(teacher.password);
  teacher.password = password.passwordHash;

  const data = new Teachers(teacher);

  data.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate email
        return res.status(500).send({ succes: false, message: 'Teacher already exist!' });
      }
      // Some other error
      return res.status(500).send(err);
    }
    return res.json({
      success: true,
    });
  });
});

// GET teachers '/'
router.get('/', (req, res) => {
  Teachers.find({}, (err, teachers) => {
    if (!err) {
      let teacherMap = {};
      teachers.forEach(t => {
        teacherMap[t._id] = t;
      });
      res.json({
        teachers: teacherMap
      })
    } else {
      res.json({
        err
      });
    }
  });
})

module.exports = router;
