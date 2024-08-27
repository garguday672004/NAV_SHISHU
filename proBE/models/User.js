const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
    },
    accountType:{
        type: String,
        enum: ['Admin', 'Surrogate', 'Parent'],
        required: true
    },
    surrogateDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Surrogate'
    },
    parentDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    },
    image:{
        type: String,
        required: true
    },
    requests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    
})

module.exports = mongoose.model('User', userSchema);