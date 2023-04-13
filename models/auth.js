var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var loginSchema = new mongoose.Schema({
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
},{collection:'logins'});

loginSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next(); 
    var salt = bcrypt.genSaltSync(12);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
},);

loginSchema.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

module.exports = mongoose.model('login', loginSchema);