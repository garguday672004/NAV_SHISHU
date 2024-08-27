const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    phoneNo: {
        type: Number,
        trim: true 
    },
    about: {
        type: String,
        trim: true
    },
    profilePic: {
        type: String
    }
})

module.exports = mongoose.model('Profile', profileSchema);