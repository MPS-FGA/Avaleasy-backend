var express = require('express');
var router = express.Router();
var crypto = require('crypto');

const mongoose = require('mongoose');
mongoose.connect('mongodb://db:27017/base');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var Schema = mongoose.Schema;
var teacherDataSchema = new Schema({
  name: {type:String, required:true},
  email: {type:String, required:true},
  password: {type:String, required:true},
  hash: String,
  salt: String
}, {collection: 'teachers'});

var Teachers = mongoose.model('TeacherData', teacherDataSchema);

/* generates salt for hash with random char string*/
var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0,length);
};

/* hash password with sha512 */
var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
      salt:salt,
      passwordHash:value
  };
};

function hashPassword(password) {
  var salt = genRandomString(16);
  var passwordData = sha512(password, salt);

  return passwordData;
}

/* POST teachers. */
router.post('/new', function(req, res, next) {
  var teacher = {
   name: req.body.nome,
   email: req.body.email,
   password: req.body.password
  };

  teacher['password'] = hashPassword(teacher['password']);

  var data = new Teachers(teacher);
  data.save();

  res.redirect('/');
});

module.exports = router;
