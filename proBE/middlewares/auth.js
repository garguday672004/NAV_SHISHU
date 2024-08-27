
const jwt = require('jsonwebtoken');
require('dotenv').config();

// auth 
exports.auth = async(req, res, next) => {
    try{
        const token = req.body.token || req.cookies.cookieHere || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Token not found'
            })
        }

        // verify the token using JWT secret key -> decode the token
        try{
            const decode = jwt.verify(token, 'sahihai');
            console.log('decode', decode);
            
            req.user = decode;
            next();
        }
        catch(err){
            console.log('Error while verifying user', err);
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }
    }
    catch(err){
        console.log('Error while verifying user', err);
        res.status(500).json({
            success: false,
            message: 'Error while verifying user'
        })
    }
}

// isMother

exports.isMother = async(req, res, next) => {
    try{
        if(req.user.role != 'Surrogate'){
            return res.status(403).json({
                success: false,
                message: 'This is protected route for Surrogate Mother'
            })
        }
        next();
    }
    catch(err){
        console.log('Error while verifying Surrogate Mother role', err);
        res.status(500).json({
            success: false,
            message: 'Error while verifying Surrogate Mother role'
        })
    }
}

// isParent

exports.isParent = async(req, res, next) => {
    try{
        if(req.user.role != 'Parent'){
            return res.status(403).json({
                success: false,
                message: 'This is protected route for Intended Parent'
            })
        }
        next();
    }
    catch(err){
        console.log('Error while verifying Intended Parent role', err);
        res.status(500).json({
            success: false,
            message: 'Error while verifying Intended Parent role'
        })
    }
}

// isAdmin

exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.role != 'Admin'){
            return res.status(403).json({
                success: false,
                message: 'This is protected route for Admin'
            })
        }
        next();
    }
    catch(err){
        console.log('Error while verifying Admin role', err);
        res.status(500).json({
            success: false,
            message: 'Error while verifying Admin role'
        })
    }
}