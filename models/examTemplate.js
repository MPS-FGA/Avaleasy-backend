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
  content: { type: String, required: true },
});

const multipleChoiceQuestions = new Schema({
  title: { type: String, required: true },
  punctuation: { type: Number },
  numberOfAlternatives: { type: Number, required: true, default: 4 },
  multipleChoiceAlternatives: [alternatives],
});

const tfQuestions = new Schema({
  title: { type: String, required: true },
  punctuation: { type: Number },
  value: { type: Boolean, required: true },
});

const ExamTemplate = new Schema({
  title: { type: String, required: true, unique: true },
  value: {
    type: Number, min: 0, max: 100, default: 100, required: true,
  },
  teacherId: { type: Number },
  tblQuestions: [tblQuestions],
  objectiveQuestions: [objectiveQuestions],
  multipleChoiceQuestions: [multipleChoiceQuestions],
  tfQuestions: [tfQuestions],
}, { collection: 'examsTemplates' });

module.exports = mongoose.model('ExamTemplateData', ExamTemplate);
