const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  batch: {
    type: String,

  },
  year: {
    type: Number,
    
  },
  SysID: {
    type: String,

  }
},{collection:'subject'});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
