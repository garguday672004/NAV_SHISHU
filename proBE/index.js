const express = require('express');
const App = express();

require('dotenv').config();

// import Routes

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const parentRoutes = require('./routes/Parent');
const motherRoutes = require('./routes/Mother');
const paymentsRoutes = require('./routes/Payments');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConfig} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 8000;

database.dbConnect();

App.use(express.json());
App.use(cookieParser());
App.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
App.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

cloudinaryConfig(); 

App.use('/api/v1/auth', userRoutes);
App.use('/api/v1/profile', profileRoutes);
App.use('/api/v1/parent', parentRoutes);
App.use('/api/v1/mother', motherRoutes);
App.use('/api/v1/payments', paymentsRoutes);

// default route
App.get('/', (req, res) => {
    res.send(`<h1>NAV SHISHU BACKEND</h1>`);
})

App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})