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