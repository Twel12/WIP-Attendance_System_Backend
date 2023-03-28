const auth = require('../models/auth');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt-nodejs');

exports.signup = catchAsync (async (req,res,next) => {
    const newUser = await auth.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            auth_list: newUser
        }
    });
});

exports.auth = async (req,res,next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError('Please provide email and password!', 400));
    }
    try{
        const auth = await auth.findOne({email: email})
        if(!auth || auth.length == 0){
            return next(new AppError('Incorrect email or password', 401));
        }
        authpassword = auth.password;

        res.status(200).json({
            status: 'success',
            data: {
                auth_data: auth
            }
        });
    }catch(err){
        res.status(401).json({
            status:'fail',
            message: err
        })
    }
};