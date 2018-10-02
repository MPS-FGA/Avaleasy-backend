const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/base');
const { Schema } = mongoose;

const tblQuestions = new Schema({
  title: { type: String, required: true },
  punctuation: { type: Number },
  alternative1Content: { type: String, required: true },
  alternative2Content: { type: String, required: true },
  alternative3Content: { type: String, required: true },
  alternative4Content: { type: String, required: true },
});

const objectiveQuestions = new Schema({
  title: { type: String, required: true },
  punctuation: { type: Number },
});

const alternatives = new Schema({
  content: { type: String, required: true }
});

const multipleChoiceQuestions = new Schema({
  title: { type: String, required: true },
  punctuation: { type: Number },
  numberOfAlternatives: { type: Number, required: true, default: 4},
  multipleChoiceAlternatives: [alternatives],
});

const tfQuestions = new Schema({
  title: { type: String, required: true },
  punctuation: { type: Number },
  value: { type: Boolean, required: true },
});

const ExamTemplate = new Schema({
  title: { type: String, required: true, unique: true},
  value: { type: Number, min: 0, max:100, default: 100, required: true},
  tblQuestions: [tblQuestions],
  objectiveQuestions: [objectiveQuestions],
  multipleChoiceQuestions: [multipleChoiceQuestions],
  tfQuestions: [tfQuestions],
}, { collection: 'examsTemplates'});

const ExamsTemplates = mongoose.model('ExamTemplateData', ExamTemplate);

/* POST Exam Model */
router.post('/new', (req, res, next) => {
  const examTemplate = {
    title: req.body.title,
    value: req.body.value,
  };

  const data = new ExamsTemplates(examTemplate);

  data.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate exam template
        return res.status(500).send({ succes: false, message: 'This template already exists!' });
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
