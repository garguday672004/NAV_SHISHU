const nodemailer = require('nodemailer');

require('dotenv').config();

// this function is used to send otp through mail to the user.
const mailSender = async (email, subject, body) => {
    try {

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: 'NavShishu || Together We Can Make Possible',
            to: email,
            subject: subject,
            html: `${body}`
        });

        console.log(info);
        return info;


    } catch (error) {
        console.log('Error sending mail', error);
    }
}

module.exports = mailSender;