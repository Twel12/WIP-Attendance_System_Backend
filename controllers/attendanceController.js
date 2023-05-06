const Attendance = require('../models/attendance');

exports.attendanceViaSubject = async(req,res) => {
  const SystemID = req.params.SystemID;
  const subject = req.params.SubjectName;
  Attendance.aggregate([
    { $unwind: "$subjects" },
    { $match: { "subjects.name": subject } },
    { $unwind: "$subjects.dates" },
    { $unwind: "$subjects.dates.attendance" },
    { $match: { "subjects.dates.attendance.SystemID": SystemID } },
    {
      $group: {
        _id: "$subjects.dates.date",
        value: { $push: "$subjects.dates.attendance.value" }
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        attendance: "$value"
      }
    }
  ]).exec((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.attendanceCount = async (req, res) => {
  const SystemID = req.params.SystemID;
  Attendance.aggregate([
    { $unwind: "$subjects" },
    { $unwind: "$subjects.dates" },
    { $unwind: "$subjects.dates.attendance" },
    { $match: { "subjects.dates.attendance.SystemID": SystemID } },
    {
      $group: {
        _id: "$subjects.name",
        presentCount: {
          $sum: {
            $cond: {
              if: { $eq: ["$subjects.dates.attendance.value", true] },
              then: 1,
              else: 0
            }
          }
        },
        absentCount: {
          $sum: {
            $cond: {
              if: { $eq: ["$subjects.dates.attendance.value", false] },
              then: 1,
              else: 0
            }
          }
        }
      }
    }
  ]).exec((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.updateAttendance = async (req, res) => {
  const { subject, date, attendance } = req.body;

  try {
    const updateResult = await Attendance.findOneAndUpdate(
      { 'subjects.name': subject, 'subjects.dates.date': date },
      {
        $set: {
          'subjects.$[subjectElem].dates.$[dateElem].attendance': attendance
        }
      },
      {
        arrayFilters: [
          { 'subjectElem.name': subject },
          { 'dateElem.date': date }
        ]
      }
    );

    if (!updateResult) {
      return res
        .status(404)
        .json({ message: 'Attendance not found for the given subject and date' });
    }

    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating attendance', error: err });
  }
};

const Subject = require('../models/teacher');

exports.getSubjectsBySysID = async function(req, res) {
  const { SysID } = req.body;
  try {
    const subjects = await Subject.find({ 'subjects.SysID': SysID });
    if (subjects.length === 0) {
      res.json({ message: 'No subjects found with matching SysID' });
    } else {
      res.json(subjects);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving subjects' });
  }
};

const Datez = require('../models/date');

exports.getDatesBySubjectAndSysID = async function(req, res) {
  const { SysID, subject } = req.params;

  try {
    const dates = await Datez.find({ "subjects.name": subject, "subjects.SysID": SysID });
    if (dates.length === 0) {
      res.json({ message: 'No dates found with matching subject and SysID' });
    } else {
      res.json(dates);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving dates' });
  }
};

exports.getAttendanceList = async (req, res) => {
  const subject = req.body.SubjectName;
  const date = req.body.Date;

  Attendance.aggregate([
    { $unwind: "$subjects" },
    { $match: { "subjects.name": subject } },
    { $unwind: "$subjects.dates" },
    { $match: { "subjects.dates.date": date } },
    {
      $group: {
        _id: null,
        attendance: { $push: "$subjects.dates.attendance" },
      },
    },
    {
      $project: {
        _id: 0,
        attendance: {
          $map: {
            input: "$attendance",
            as: "a",
            in: {
              SystemID: "$$a.SystemID",
              value: "$$a.value",
            },
          },
        },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Create a map of SystemIDs to attendance values
      const attendanceMap = new Map();
      result[0].attendance.forEach((record) => {
        attendanceMap.set(record.SystemID, record.value);
      });

      // Create an array of objects containing SystemID and attendance value
      const attendanceArray = Array.from(attendanceMap).map(([SystemID, value]) => ({
        SystemID,
        value,
      }));

      res.status(200).send(attendanceArray);
    }
  });
};