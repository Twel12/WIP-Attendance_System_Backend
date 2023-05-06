const express = require('express')
const attendanceController = require('../controllers/attendanceController')

const router = express.Router();

router.post('/SubjectList/:SystemID', attendanceController.getSubjectsBySysID)
    .post('/DateList/:Subject/:SystemID', attendanceController.getDatesBySubjectAndSysID)
    .post('/AttendanceList/', attendanceController.getAttendanceList)
        .get('/:SystemID', attendanceController.attendanceCount)
        .get('/:SystemID/:SubjectName', attendanceController.attendanceViaSubject)

    // .post('/updateAttendance', attendanceController.updateAttendance)

module.exports = router;