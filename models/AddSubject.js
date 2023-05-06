const mongoose = require('mongoose');

const addSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  SysID: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('AddSubject', addSubjectSchema);
