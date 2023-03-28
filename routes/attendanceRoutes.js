const express = require('express')
const attendanceController = require('../controllers/attendanceController')

const router = express.Router();

router.get('/:SystemID', attendanceController.attendanceCount)
    .get('/:SystemID/:SubjectName', attendanceController.attendanceViaSubject)
    // .post('/updateAttendance', attendanceController.updateAttendance)

module.exports = router;