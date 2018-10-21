const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const mongoose = require('mongoose');

// const AuthMiddleware = require('../utils/auth.middleware');
// const CheckUserAcess = require('../utils/auth.userAcessVerification');
// const GetUserFromRequest = require('../utils/auth.getUserIdentity');

const Teacher = require('../models/teacher');
// const hashPassword = require('../utils/password');

mongoose.connect('mongodb://db:27017/base');

/* POST teachers. */
router.post('/new', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const teacher = new Teacher({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    teacher.save()
      .then(() => {
        res.status(201).json({
          message: 'teacher created',
        });
      })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate email
          return res.status(400).send({ success: false, message: 'Teacher already exist!' });
        } if (err.name === 'ValidationError') {
          // Data validaton errors
          return res.status(400).send({ success: false, message: 'Invalid data!' });
        }
        // Some other error
        return res.status(400).send(err);
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

router.put('/edit/:id', (req, res, next) => {
  Teacher.findById(req.params.id)
    .then((teacher) => {
      const t = teacher;
      if (!teacher) {
        return res.status(404).send({
          message: 'Teacher not found',
        });
      }
      t.name = req.body.name;
      const password = bcrypt.hash(req.body.password, 10);
      t.password = password;
      t.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(201).send(teacher);
      });
      return res.status(400);
    });
});
module.exports = router;
