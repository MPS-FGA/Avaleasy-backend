const express = require('express');
const ExamsTemplates = require('../models/examTemplate.js');

const router = express.Router();

/* POST Exam Model */
router.post('/new', (req, res, next) => {
  const examTemplate = {
    title: req.body.title,
    value: req.body.value,
    tblQuestions: req.body.tblQuestions,
    objectiveQuestions: req.body.objectiveQuestions,
    multipleChoiceQuestions: req.body.multipleChoiceQuestions,
    tfQuestions: req.body.tfQuestions,
  };

  const data = new ExamsTemplates(examTemplate);

  data.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate exam template
        return res.status(500).send({ succes: false, message: 'This template already exists!' });
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

module.exports = router;
