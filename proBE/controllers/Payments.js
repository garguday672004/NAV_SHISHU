const {instance} = require('../config/razorpay');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const Payment = require('../models/Payment');
const mongoose = require('mongoose');


// capture the payments and initiate the Razorpay order

exports.capturePayment = async(req,res) => {
    try{

        // get userId
        const userId = req.user.id;

        // validation
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'Please provide valid userId'
            })
        }

        // user already paid or not
        const findUser = await Payment.findById(userId);

        if(findUser){
            return res.status(400).json({
                success: false,
                message: 'User already paid'
            })
        }

        // order create
        const options = {
            amount: 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
            notes:{
                userId
            }
        };

        try{
            // initiate the payment using Razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log('Payment Response:', paymentResponse);

            return res.status(200).json({
                success: true,
                message: 'Payment initiated successfully',
                orderID: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
                userID: userId
            })
        }
        catch(err){
            console.log('Error while initiating payment', err);
            return res.status(500).json({
                success: false,
                message: 'Error while initiating payment'
            })
        }
    }
    catch(err){
        console.log('Error while capturing payment', err);
        res.status(500).json({
            success: false,
            message: 'Error while capturing payment'
        })
    }
}

exports.verifySignature = async(req,res) => {
    try{
        // verify the signature
        const webhookSecret = "12345678";

        const signature = req.headers['x-razorpay-signature'];

        const shasum = crypto.createHmac('sha256', webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        if(signature === digest){
            console.log('Payment is Authorized');

            // save the payment details

            const userId = req.body.payload.payment.entity.notes.userId;
            const userIdObject = new mongoose.Types.ObjectId(userId);

            const newPayment = await Payment.create({
                userID: userIdObject,
                orderID: req.body.payload.payment.entity.order_id,
                paymentID: req.body.payload.payment.entity.id,
            }).populate('userID');

            //send email to the user

            const mailResponse = await mailSender(
                newPayment.userID.email,
                'Payment Received - NavShishu',
                'Payment has been successfully received'
            )
            console.log('Email Response:', mailResponse)

            return res.status(200).json({
                success: true,
                message: 'Payment is Authorized',
                data: newPayment
            })
        }
        else{
            console.log('Payment is Unauthorized signature mismatch');
        }
    }
    catch(err){
        console.log('Error while verifying signature', err);
        res.status(500).json({
            success: false,
            message: 'Error while verifying signature'
        })
    }
}