const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentID:{
        type: Date,
    },
    orderID:{
        type: String,
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Payment', paymentSchema);