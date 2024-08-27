const mongoose = require('mongoose');

const surrogateSchema = new mongoose.Schema({
    healthDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Health'
    },
    height:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    bloodGroup:{
        type: String,
        required: true
    },
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
        type: Boolean,
        required: true
    },
    ID:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Surrogate', surrogateSchema);