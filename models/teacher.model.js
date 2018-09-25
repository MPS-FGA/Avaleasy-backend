const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/base');
const Schema = mongoose.Schema;

const teacherDataSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: false },
}, { collection: 'teachers' });

const Teachers = mongoose.model('TeacherData', teacherDataSchema);

module.exports = Teachers;
