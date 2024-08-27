const Health = require('../models/Health');
const Surrogate = require('../models/Surrogate');
const User = require('../models/User');

// create Health record handler function

exports.createHealth = async(req,res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        const surrogateId = user.surrogateDetails;

        const {lifestyleHabits, allergies, prevPregnancy} = req.body;

        // validation
        if(!lifestyleHabits || !allergies || !prevPregnancy){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }

        // create an entry for new health record
        const newHealth = await Health.create({
            lifestyleHabits,
            allergies,
            prevPregnancy
        })

        // save new health id in surrogate collection
        const updatedSurrogate = await Surrogate.findByIdAndUpdate(surrogateId, {
            healthDetails: newHealth._id
        }, {new: true}).populate('healthDetails');

        // send response
        res.status(200).json({
            success: true,
            message: 'Health record created successfully',
            data: updatedSurrogate
        })
    }
    catch(err){
        console.log('Error while creating Health record', err);
        res.status(500).json({
            success: false,
            message: 'Error while creating Health record'
        })
    }
}

// update health record handler function


// TODO: update health record handler function wants healthID provide it in the request body
exports.updateHealth = async(req,res) => {
    try{

        // const userId = req.user.id;
        // console.log('userId', userId)
        // const user = await User.findById(userId).populate('surrogateDetails');
        // const surrogateId = user.surrogateDetails._id;
        // console.log('surrogateId', surrogateId)
        // const surrogate = await Surrogate.findById(surrogateId);
        // const healthId = surrogate.healthDetails;
        // console.log('healthId', healthId)

        const {healthId, lifestyleHabits, allergies, prevPregnancy} = req.body;

        // validation need not felt here as we are updating the record

        // update health record
        const health = await Health.findByIdAndUpdate(healthId, {
            lifestyleHabits,
            allergies,
            prevPregnancy
        },{new: true});

        // send response
        res.status(200).json({
            success: true,
            message: 'Health record updated successfully'
        })
    }
    catch(err){
        console.log('Error while updating Health record', err);
        res.status(500).json({
            success: false,
            message: 'Error while updating Health record'
        })
    }
}

// TODO: delete health record handler function