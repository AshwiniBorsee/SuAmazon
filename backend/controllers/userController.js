const UserModel = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');

exports.signUpUser = asyncErrorHandler(async (request, response, next) => {

    const { name, email, gender, password } = request.body;

    const user = await UserModel.create({
        name, 
        email,
        gender,
        password,
    });

    sendToken(user, 201, response);
});

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email-ID and Password", 400));
    }

    const user = await UserModel.findOne({ email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email-Id or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email-Id or Password", 401));
    }

    sendToken(user, 201, res);
});

exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

exports.getUserInfo = asyncErrorHandler(async (req, res, next) => {
    
    const user = await UserModel.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

exports.changePassword = asyncErrorHandler(async (req, res, next) => {

    const user = await UserModel.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is Invalid", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 201, res);
});

exports.changeProfile = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    });
});

// ADMIN DASHBOARD


exports.fetchAllUsers = asyncErrorHandler(async (req, res, next) => {

    const users = await UserModel.find();

    res.status(200).json({
        success: true,
        users,
    });
});


exports.getUser = asyncErrorHandler(async (req, res, next) => {

    const user = await UserModel.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`UserModel doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});


exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        role: req.body.role,
    }

    await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {

    const user = await UserModel.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`UserModel doesn't exist with id: ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true
    });
});