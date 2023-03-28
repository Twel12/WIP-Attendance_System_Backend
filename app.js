const express = require('express');

const loginRouter = require('./routes/loginRoutes.js');
const attendanceRouter = require('./routes/attendanceRoutes.js');
// const defaultrouter = require('./routes/default.js')

const app = express();
app.use(express.json());

app.use('/attendance', attendanceRouter);

module.exports = app;