const express = require('express');
const crypto = require('crypto');
const Teacher = require('../models/teacher.js');

const router = express.Router();

/* generates salt for hash with random char string */
const genRandomString = function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

/* hash password with sha512 */
const sha512 = function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    passwordHash: value,
  };
};

function hashPassword(password) {
  const salt = genRandomString(16);
  const passwordData = sha512(password, salt);

  return passwordData;
}

/* POST teachers. */
router.post('/new', (req, res, next) => {
  const teacher = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const password = hashPassword(teacher.password);
  teacher.password = password.passwordHash;

  const data = new Teacher(teacher);

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
      const password = hashPassword(req.body.password);
      t.password = password.passwordHash;
      t.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(teacher);
      });
      return res.status(400);
    });
});

module.exports = router;
