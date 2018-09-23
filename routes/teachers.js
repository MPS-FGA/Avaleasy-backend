var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var Teachers = require('../models/teacher.model');

var authMiddleware = require('../auth.middleware');

mongoose.connect('mongodb://db:27017/base');
const { Schema } = mongoose;

// var teacherDataSchema = new Schema({
//   name: {type:String, required:true},
//   email: {type:String, required:true},
//   password: {type:String, required:true}
// }, {collection: 'teachers'});

// var Teachers = mongoose.model('TeacherData', teacherDataSchema);

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
      res.json(teacherMap)
    } else {
      res.json({
        err
      });
    }
  });
})

module.exports = router;
