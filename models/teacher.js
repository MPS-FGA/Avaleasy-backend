const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherDataSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  __v: { type: Number, select: false },
}, { collection: 'teachers' });

module.exports = mongoose.model('TeacherData', teacherDataSchema);
