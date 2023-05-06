const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  SystemID: {
    type: String
  },
  Teacher_SysID: {
    type: String
  },
  value: {
    type: Boolean
  },
  time: {
    type: String,
  }
});

const dateSchema = new mongoose.Schema({
  date: {
    type: String
  },
  students: [attendanceSchema]
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String
  },
  dates: [dateSchema]
});

const attendanceRecordSchema = new mongoose.Schema({
  subjects: [subjectSchema],
},{collection:'attendance_log'});

const Attendance = mongoose.model('Attendance', attendanceRecordSchema);

module.exports = Attendance;