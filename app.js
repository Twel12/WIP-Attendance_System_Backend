const express = require('express');
const authRouter = require('./routes/authRoutes.js');
const attendanceRouter = require('./routes/attendanceRoutes.js');

const app = express();
app.use(express.json());
var cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.use('/attendance', attendanceRouter);
app.use('/auth', authRouter);
module.exports = app;