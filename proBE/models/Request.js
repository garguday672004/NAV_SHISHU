const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    message:{
        type: String,
    },
    status:{
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    },
    timeStamp:{
        type: Date,
        default: Date.now
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    },
})

module.exports = mongoose.model('Request', requestSchema);