const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = async() => {
    await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Error connecting to database', err);
    })
}

exports.dbConnect = dbConnect;