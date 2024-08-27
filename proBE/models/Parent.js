const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    motivation:{
        type: String,
        required: true
    },
    agreement:{
        type: String,
        required: true
    },
    ID:{
        type: String,
        required: true
    },
    maritalStatus:{
        type: String,
        required: true
    },
    fertilityIssues:{
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('Parent', parentSchema);