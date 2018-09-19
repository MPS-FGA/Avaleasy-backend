const express = require('express');

const router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/base');
const { Schema } = mongoose;

const teacherDataSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { collection: 'teachers' });

const Teachers = mongoose.model('TeacherData', teacherDataSchema);

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

  const data = new Teachers(teacher);
  data.save();

  res.redirect('/');
});

module.exports = router;
