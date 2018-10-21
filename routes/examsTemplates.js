const express = require('express');
const ExamsTemplates = require('../models/examTemplate.js');

// const AuthMiddleware = require('../utils/auth.middleware');
// const CheckUserAcess = require('../utils/auth.userAcessVerification');
// const GetUserFromRequest = require('../utils/auth.getUserIdentity');

const router = express.Router();

/* Endpoint to POST a single Exam Model */
router.post('/new', (req, res, next) => {
  const examTemplate = {
    title: req.body.title,
    value: req.body.value,
    teacherId: req.body.teacherId,
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
        return res.status(400).send({ err });
      }
      // Some other error
      return res.status(500).send(err);
    }
    return res.json({
      success: true,
    });
  });
});

/* Endpoint to get all Exams Models */
router.get('/', (req, res) => {
  ExamsTemplates.find()
    .then((examsTemplates) => {
      res.status(200).send(examsTemplates);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving the Exams Templates',
      });
    });
});

/* Endpoint to GET a single Exam Model by id */
router.get('/:id', (req, res) => {
  ExamsTemplates.findById(req.params.id)
    .then((examsTemplates) => {
      if (!examsTemplates) {
        return res.status(404).send({
          message: 'Exam Template not found',
        });
      }
      return res.status(200).send(examsTemplates);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Exam Template not found',
        });
      }
      return res.status(500).send({
        message: 'Error retrieving the Exam Template',
      });
    });
});

module.exports = router;
