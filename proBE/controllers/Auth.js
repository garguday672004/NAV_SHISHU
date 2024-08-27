const User = require('../models/User');
const Otp = require('../models/Otp');
const Profile = require('../models/Profile');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const otpGenerator = require('otp-generator');

const {mailSender} = require('../utils/mailSender');

require('dotenv').config();

// sendOtp

exports.sendOtp = async(req,res) => {
    try{
        const {email} = req.body;

        // check if user exists
        const findUser = await User.findOne({email});

        if(findUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        // generate otp

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        console.log('Generated OTP:', otp);

        // check unique otp or not

        const findOtp = await Otp.findOne({otp});

        while(findOtp){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            console.log('Generated OTP:', otp);

            findOtp = await Otp.findOne({otp});
        }

        // save that otp in database

        const newOtp = await Otp.create({
            otp,
            email
        })
        // console.log('New OTP:', newOtp);

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            data: newOtp
        })
    }
    catch(err){
        console.log('Error sending otp', err);
        res.status(500).json({
            success: false,
            message: 'Error while sending otp'
        })
    }
}


// signup

exports.signup = async (req,res) => {
    try{

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        // apply validation
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // match both the passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password and confirmPassword do not match'
            })
        }

        // check if user already exists
        const findUser = await User.findOne({email});

        if(findUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        // find most recent otp
        const recentOtp = await Otp.findOne({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOtp);

        // validate otp
        console.log(typeof(recentOtp.otp), typeof(otp));
        if(recentOtp.otp !== otp){
            return res.status(400).json({
                success: false,
                message: 'OTP do not match'
            })
        }

        // secure the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            res.status(500).json({
                success: false,
                message: 'password encryption failed'
            })
        }
        // H/W: u can also apply retry strategy here
        
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            phoneNo: null,
            about: null
        })

        // create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=${firstName} ${lastName}`,
            additionalDetails: profileDetails._id
        })

        const populatedUser = await User.findById(newUser._id).populate('additionalDetails');
        // console.log('Populated User:', populatedUser);

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        })
    }
    catch(err){
        console.log('Error signing up user', err);
        res.status(500).json({
            success: false,
            message: 'Error while signing up user'
        })
    }
}

// login

exports.login = async (req,res) => {
    try{
        
        const {email, password} = req.body;

        // apply validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // check if user exists
        let findUser = await User.findOne({email}).populate('additionalDetails');

        if(!findUser){
            return res.status(400).json({
                success: false,
                message: 'User does not exists'
            })
        }

        // verify the password
        const isMatch = await bcrypt.compare(password, findUser.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Password do not match'
            })
        }

        // create a JWT token
        const payload = {
            email: findUser.email,
            id: findUser._id,
            role: findUser.accountType
        }

        let token = jwt.sign(
            payload,
            'sahihai',
            {
                expiresIn: '3h'
            }
        )

        findUser = findUser.toObject();
        findUser.token = token; 
        findUser.password = undefined;
        
        const options = {
            expiresIn: new Date(Date.now() + 2*24*60*60*1000),
            httpOnly: true
        }

        // send cookie in response
        res.cookie("cookieHere", token, options).status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: findUser,
            token: token
        })   
    }
    catch(err){
        console.log('Error logging up user', err);
        res.status(500).json({
            success: false,
            message: 'Error while logging up user'
        })
    }
}

// change password
exports.changePassword = async(req,res) => {
    try{    
        const {email, oldPassword, newPassword, confirmNewPassword} = req.body;

        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(400).json({
                success: false,
                message: 'User does not exists'
            })
        }

        // validation
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }   

        // verify the password
        const isMatch = await bcrypt.compare(oldPassword, findUser.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Old password do not match'
            })
        }

        // match both the passwords
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match'
            })
        }

        // secure the password
        const hashedPassword = await bcrypt.hash(newPassword,10);

        // update the password
        const updatedUser = await User.findByIdAndUpdate({
            email,
            password: hashedPassword
        })

        // send mail to the user that password is updated
        const mailResponse = await mailSender(email, 'Password Updated Successfully', 'Your password has been updated successfully. If you have not done this, please contact us immediately.');
        console.log('Mail sent successfully', mailResponse);

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            data: updatedUser
        })
    }   
    catch(err){
        console.log('Error changing password', err);
        res.status(500).json({
            success: false,
            message: 'Error while changing password'
        })
    }
}