const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    
  },
  date: {
    
  },
  attendance: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
      present: {
        type: Boolean,
        default: false
      }
    }
  ]
},{collection:'attendance_log'});

const Date = mongoose.model('Date', dateSchema);

module.exports = Date;