const Surrogate = require('../models/Surrogate');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const Health = require('../models/Health');
const User = require('../models/User');

require('dotenv').config();

// create Surrogate Mother handler function
exports.createSurrogate = async(req,res) => {
    try{
        const userId = req.user.id;
        const {height, weight, bloodGroup, city, state, motivation, agreement} = req.body;
        const ID = req.files.ID;

        // validation
        if(!height || !weight || !bloodGroup || !city || !state || !motivation || !agreement || !ID){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }

        // upload ID to cloudinary
        const uploadedID = await uploadImageToCloudinary(ID, process.env.FOLDER_NAME);

        // create an entry for new surrogate mother

        const newSurrogate = await Surrogate.create({
            height,
            weight,
            bloodGroup,
            city,
            state,
            motivation,
            agreement,
            ID: uploadedID.secure_url
        })

        // save new surrogate id in user collection
        const updatedUser = await User.findByIdAndUpdate(userId, {
            surrogateDetails: newSurrogate._id
        }, {new: true}).populate('surrogateDetails');

        res.status(200).json({
            success: true,
            message: 'Surrogate Mother created successfully'
        })
    }
    catch(err){
        console.log('Error while creating Surrogate Mother', err);
        res.status(500).json({
            success: false,
            message: 'Error while creating Surrogate Mother'
        })
    }
}

// update surrogate Details

exports.updateSurrogateDetails = async(req,res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        const surrogateId = user.surrogateDetails;

        const {height, weight, bloodGroup, city, state, motivation, agreement} = req.body;

        // validation not done here....

        // update surrogate mother details
        const updatedSurrogate = await Surrogate.findByIdAndUpdate(surrogateId, {
            height,
            weight,
            bloodGroup,
            city,
            state,
            motivation,
            agreement,
        }, {new: true});

        res.status(200).json({
            success: true,
            message: 'Surrogate Mother details updated successfully',
            data: updatedSurrogate
        })
    }
    catch(err){
        console.log('Error while updating Surrogate Mother details', err);
        res.status(500).json({
            success: false,
            message: 'Error while updating Surrogate Mother details'
        })
    }
}

exports.updateSurrogateID = async(req,res) => {
    try{
        const ID = req.files.ID;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const surrogateId = user.surrogateDetails;

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = ID.mimetype.replace('image/','').toLowerCase();

        if(supportedTypes.indexOf(fileType) === -1){
            return res.status(400).json({
                message: 'File type not supported'
            });
        }

        // upload image to cloudinary
        const uploadedImage = await uploadImageToCloudinary(ID, 'NavShishu');

        const updatedSurrogate = await Surrogate.findByIdAndUpdate(surrogateId,{
            ID: uploadedImage.secure_url
        },{new: true});

        res.status(200).json({
            success: true,
            message: 'Surrogate ID updated successfully',
            data: updatedSurrogate
        })
    }
    catch(err){
        console.log('Error while updating Surrogate ID', err);
        res.status(500).json({
            success: false,
            message: 'Error while updating Surrogate ID'
        })
    }
}

// TODO: delete surrogate mother

exports.getSurrogateDetails = async(req,res) => {
    try{

        // const {surrogateId} = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId)
        .populate({
            path: 'surrogateDetails',
            populate: {
                path: 'healthDetails'
            }
        })
        .populate('additionalDetails')
        .exec();
        const surrogateId = user.surrogateDetails;

        // const surrogateDetails = await Surrogate.findById(surrogateId).populate('healthDetails').exec();

        return res.status(200).json({
            success: true,
            message: 'Surrogate Mother details fetched successfully',
            data: user
        })
    }
    catch(err){
        console.log('Error while fetching Surrogate Mother details', err);
        res.status(500).json({
            success: false,
            message: 'Error while fetching Surrogate Mother details'
        })
    }
}

exports.showRequestedParents = async(req,res) => {
    try{

        const surrogateId = req.user.id;

        if(req.user.role !== 'Surrogate'){
            return res.status(400).json({
                success: false,
                message: 'You are not a surrogate mother'
            })
        }

        const requestedParents = await User.findById(surrogateId, {
            requests: true
        })
        .populate({
            path: 'requests',
            populate: {
                path: 'parentDetails',
                populate: {
                    path: 'additionalDetails'
                }
            }
        })
        .exec();

        res.status(200).json({
            success: true,
            message: 'Requested parents fetched successfully',
            data: requestedParents
        })
    }
    catch(err){
        console.log('Error while fetching requested parents', err);
        res.status(500).json({
            success: false,
            message: 'Error while fetching requested parents'
        })
    }
}