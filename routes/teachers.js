var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://db:27017/base');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

/* POST teachers. */
router.post('/', (req, res, next) => {
  res.status(201).send({message: "Teacher created!"});
});

module.exports = router;
