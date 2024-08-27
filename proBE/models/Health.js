const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
    prevPregnancy:{
        type: Number,
        required: true
    },
    allergies:{
        type: String,
        required: true
    },
    lifestyleHabits:{
        type: String,
        required: true
    },

    // TODO: Add more fields as needed
})

module.exports = mongoose.model('Health', healthSchema);