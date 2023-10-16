var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var SignUpSchema = new mongoose.Schema({
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    SysID: {type: String,required:true},
    isStudent: {type: Object, required: true},
    isTeacher: {type: Boolean, required: true},
    isAdmin: {type: Boolean, required: true},
},{collection:'auths'});

SignUpSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next(); 
    var salt = bcrypt.genSaltSync(12);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
},);


module.exports = mongoose.model('signup', SignUpSchema);