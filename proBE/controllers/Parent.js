const Parent = require('../models/Parent');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

exports.createParent = async(req,res) => {
    try{

        const {city, state, motivation, agreement, maritalStatus, fertilityIssues} = req.body;
        const ID = req.files.ID;

        // validation

        if(!city || !state || !motivation || !agreement || !ID || !maritalStatus || !fertilityIssues){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }

        // upload ID to cloudinary
        const uploadedID = await uploadImageToCloudinary(ID, process.env.FOLDER_NAME);

        // create an entry for new parent

        const newParent = await Parent.create({
            city,
            state,
            motivation,
            agreement,
            ID: uploadedID.secure_url,
            maritalStatus,
            fertilityIssues
        })

        const userId = req.user.id;
        const findUser = await User.findByIdAndUpdate(userId,{
            parentDetails: newParent._id
        },{new: true}).populate('parentDetails');

        return res.status(200).json({
            success: true,
            message: 'Parent created successfully',
            data: findUser
        })
    }   
    catch(err){
        console.log('Error while creating parent', err);
        res.status(500).json({
            success: false,
            message: 'Error while creating parent'
        })
    }
}

exports.updateParent = async(req,res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        const parentId = user.parentDetails;
        
        const {city, state, motivation, agreement, maritalStatus, fertilityIssues} = req.body;

        // validation need not felt here as we are updating the record

        // update parent record
        const updatedParent = await Parent.findByIdAndUpdate(parentId, {
            city,
            state,
            motivation,
            agreement,
            maritalStatus,
            fertilityIssues
        },{new: true});

        res.status(200).json({
            success: true,
            message: 'Parent updated successfully',
            data: updatedParent
        });
    }
    catch(err){
        console.log('Error while updating parent', err);
        res.status(500).json({
            success: false,
            message: 'Error while updating parent'
        })
    }
}

exports.updateParentID = async(req,res) => {
    try{
        const ID = req.files.ID;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const parentId = user.parentDetails;

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = ID.mimetype.replace('image/','').toLowerCase();

        if(supportedTypes.indexOf(fileType) === -1){
            return res.status(400).json({
                message: 'File type not supported'
            });
        }

        // upload image to cloudinary
        const uploadedImage = await uploadImageToCloudinary(ID, 'NavShishu');

        const updatedParent = await Parent.findByIdAndUpdate(parentId,{
            ID: uploadedImage.secure_url
        },{new: true});

        res.status(200).json({
            success: true,
            message: 'Parent ID updated successfully',
            data: updatedParent
        })
    }
    catch(err){
        console.log('Error while updating parent ID', err);
        res.status(500).json({
            success: false,
            message: 'Error while updating parent ID'
        })
    }
}

exports.showAllSurrogateMothers = async(req,res) => {
    try{

        // const allSurrogateMothers = await User.find({accountType: 'Surrogate'}, {
        //     firstName: true,
        //     lastName: true,
        //     image: true,
        //     // show all the surrogate mother details
        //     surrogateDetails: true
        // })
        const allSurrogateMothers = await User.find({accountType: 'Surrogate'},{
            requests: false,
            password: false,
            accountType: false
        })
        .populate('additionalDetails')
        .populate('surrogateDetails')
        // .populate({
        //     path: 'surrogateDetails',
        //     populate: {
        //         path: 'healthDetails'
        //     }
        // })
        .exec();

        res.status(200).json({
            success: true,
            message: 'All Surrogate Mothers fetched successfully',
            data: allSurrogateMothers
        })
    }
    catch(err){
        console.log('Error while fetching Surrogate Mothers', err);
        res.status(500).json({
            success: false,
            message: 'Error while fetching Surrogate Mothers'
        })
    }
}

exports.requestMother = async(req,res) => {
    try{

        const {requested, motherId} = req.body;
        const userId = req.user.id;

        if(req.user.role !== 'Parent'){
            return res.status(400).json({
                success: false,
                message: 'You are not authorized to request a mother'
            })
        }

        if(requested){
            // check if user is already requested
            const mother = await User.findById(motherId);
            if(mother.requests.includes(userId)){
                return res.status(400).json({
                    success: false,
                    message: 'Request already sent'
                })
            }

            // send request to mother
            const updateUser = await User.findOneAndUpdate(
                { _id: motherId },
                {$push: {requests: userId}},
                {new: true}
            )

            const parent = await User.findByIdAndUpdate(
                { _id: userId },
                {$push: {requests: motherId}},
                {new: true}
            )   

            return res.status(200).json({
                success: true,
                message: 'Mother requested successfully'
            })
        }
        else{
            // cancel request
            
            // check if user has already requested or not
            const mother = await User.findById(motherId);
            if(!mother.requests.includes(userId)){
                return res.status(400).json({
                    success: false,
                    message: 'Firstly send a Request'
                })
            }

            // cancel request
            const updateUser = await User.findOneAndUpdate({
                _id: motherId
            },{
                $pull: {requests: userId}
            },{new: true});

            return res.status(200).json({
                success: true,
                message: 'Mother request cancelled successfully'
            })
        }
    }
    catch(err){
        console.log('Error while requesting mother', err);
        res.status(500).json({
            success: false,
            message: 'Error while requesting mother'
        })
    }
}