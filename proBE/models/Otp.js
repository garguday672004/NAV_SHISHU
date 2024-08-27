const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60
    },
    email:{
        type: String,
        required: true
    },
})

async function sendVerificationMail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email from NavShishu", otp);
        console.log('Mail sent successfully', mailResponse);
    }
    catch(err){
        console.log('Error in sending mail', err);
    }
}

otpSchema.pre('save', async function(next){
    await sendVerificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model('Otp', otpSchema);