var express = require('express');
var router = express.Router();

/* POST teachers. */
router.post('/', (req, res, next) => {
  res.status(201).send({message: "Teacher created!"});
});

module.exports = router;
