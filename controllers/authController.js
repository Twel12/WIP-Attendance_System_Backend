const auth = require('../models/auth');
const newuser = require('../models/signup');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

exports.signup = catchAsync (async (req,res,next) => {
    const newUser = await newuser.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            auth_list: newUser
        }
    });
});

exports.login = async(req,res,next) => {
    const {email,password,SysID} = req.body;
    try{
        const authdata = await auth.findOne({email:email}); 
            if(!authdata){
                res.status(401).json({
                    status: 'fail',
                    message: 'Incorrect email or password'
                });
                return (null,false);
            }
            const authpassword = authdata.password;
            const responsedata = authdata;
            responsedata.password = undefined;
            const passwordMatch = bcrypt.compareSync(password,authpassword);
            if(!passwordMatch){
                res.status(401).json({
                    status: 'fail',
                    message: 'Incorrect email or password'
                });
            }else{
                const token = jwt.sign(
                    {
                    userId: SysID,
                    userEmail: email,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                );
            res.status(200).json({
                status: 'success',
                token: token,
                    responsedata
                })
            ;}
    }catch(error){
            res.status(500).json({
                status: 'fail',
                message: error
            });
    }
};

const AddSubject = require('../models/AddSubject');

// Handle POST request for adding a new subject
exports.addSubject = async (req, res) => {
  try {
    const { name, batch, year, SysID } = req.body;
    const newSubject = new AddSubject({ name, batch, year, SysID });
    await newSubject.save();
    res.status(201).json({ message: 'Subject added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Failed to add subject.' });
  }
};


// const Sub2 = require('../models/subject')

// exports.createSubject = async (req, res) => {
//   try {
//     const newSubject = new Sub2(req.body);
//     await newSubject.save();
//     res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
