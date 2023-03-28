const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    SysID:{type: String, required: true,unique: true},
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    isStudent: {type: Object,required: true},
    isTeacher: {type: Object,required: true},
    isAdmin: {type: Object,required: true},
    photo: {type: String},
    School: {type: String},
});

module.exports = mongoose.model('user', userSchema);