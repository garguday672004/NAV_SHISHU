const Profile = require('../models/Profile');
const User = require('../models/User');

const {uploadImageToCloudinary} = require('../utils/imageUploader');

require('dotenv').config();

exports.updateProfile = async(req,res) => {
    try{

        const {firstName, lastName, gender, phoneNo, dateOfBirth="", about=""} = req.body;

        const userId = req.user.id;

        // validation
        if(!gender){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }

        const userDetails = await User.findByIdAndUpdate(userId,{
            firstName: firstName,
            lastName: lastName
        }).populate('additionalDetails');
        
        const profileId = userDetails.additionalDetails;

        const findProfile = await Profile.findByIdAndUpdate(profileId,{
            gender: gender,
            phoneNo: phoneNo,
            dateOfBirth: dateOfBirth,
            about: about
        },{new: true});

        const updatedUserDetails = await User.findById(userId).populate('additionalDetails');

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUserDetails
        });

    }
    catch(err){
        console.log('Error while updating profile', err);
        res.status(500).json({
            success: false,
            message: 'Error while updating profile'
        })
    }
}

// TODO: getAllUserDetails function

exports.getUserDetails = async(req,res) => {
    try{
        const userId = req.user.id;

        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const userDetails = await User.findById(userId).populate('additionalDetails');

        res.status(200).json({
            success: true,
            message: 'User details fetched successfully',
            data: userDetails
        });
    }
    catch(err){
        console.log('Error while getting user details', err);
        res.status(500).json({
            success: false,
            message: 'Error while getting user details'
        })
    }
}

exports.updateProfilePic = async(req,res) => {
    try{

        const profilePic = req.files.profilePic;
        const userId = req.user.id;

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = profilePic.mimetype.replace('image/','').toLowerCase();

        if(supportedTypes.indexOf(fileType) === -1){
            return res.status(400).json({
                message: 'File type not supported'
            });
        }

        // upload image to cloudinary
        const uploadedImage = await uploadImageToCloudinary(profilePic, 'NavShishu');

        const updatedUser = await User.findByIdAndUpdate(userId,{
            image: uploadedImage.secure_url
        },{new: true}).populate('additionalDetails');

        // const userDetails = await User.findById(userId).populate('additionalDetails');
        // const profileId = userDetails.additionalDetails;

        // const updatedUser = await Profile.findByIdAndUpdate(profileId,{
        //     profilePic: uploadedImage.secure_url
        // },{new: true})

        res.status(200).json({
            success: true,
            message: 'Profile pic updated successfully',
            data: updatedUser
        });
    }
    catch(err){
        console.log('Error while updating profile pic', err);
        res.status(500).json({
            success: false,
            message: 'Error while updating profile pic'
        })
    }
}