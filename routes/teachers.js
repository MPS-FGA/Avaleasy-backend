var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://db:27017/base');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
var Schema = mongoose.Schema;

var teacherDataSchema = new Schema({
  nome: {type:String, required:true},
  email: {type:String, required:true}
}, {collection: 'teachers'});

var Teachers = mongoose.model('TeacherData', teacherDataSchema);

/* POST teachers. */
router.post('/novo', function(req, res, next) {
 var teacher = {
   nome: req.body.nome,
   email: req.body.email
 };

 var data = new Teachers(teacher);
 data.save();

 res.redirect('/');
});

module.exports = router;
