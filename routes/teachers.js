const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Teacher = require('../models/teacher');
const hashPassword = require('../utils/password');

mongoose.connect('mongodb://db:27017/base');

/* POST teachers. */
router.post('/new', (req, res, next) => {
  const teacher = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    salt: '',
  };

  const password = hashPassword(teacher.password);
  teacher.password = password.passwordHash;
  teacher.salt = password.salt;

  const data = new Teacher(teacher);

  data.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate email
        return res.status(400).send({ success: false, message: 'Teacher already exist!' });
      } if (err.name === 'ValidationError') {
        // Data validaton errors
        return res.status(400).send({ success: false, message: 'Invalid data!' });
      }
      // Some other error
      return res.status(500).send(err);
    }
    return res.json({
      success: true,
    });
  });
});

router.get('/', (req, res) => {
  Teacher.find()
    .then((teachers) => {
      res.status(200).send(teachers);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving teachers',
      });
    });
});

router.get('/:id', (req, res) => {
  Teacher.findById(req.params.id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).send({
          message: 'Teacher not found',
        });
      }
      return res.status(200).send(teacher);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Teacher not found',
        });
      }
      return res.status(500).send({
        message: 'Error retrieving teacher',
      });
    });
});

router.delete('/:id', (req, res) => {
  Teacher.findByIdAndRemove(req.params.id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).send({
          message: 'Teacher not found',
        });
      }
      return res.status(204).send({ message: 'Teacher deleted' });
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Teacher not found',
        });
      }
      return res.status(500).send({ message: err.message || 'Some error occurred while deleting the teacher' });
    });
});


module.exports = router;
