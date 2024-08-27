const express = require("express")
const router = express.Router()

const {auth} = require('../middlewares/auth');

const {updateProfile, updateProfilePic, getUserDetails} = require('../controllers/Profile');

router.put("/updateProfile", auth, updateProfile)
router.post("/updateProfilePic", auth, updateProfilePic)
router.get("/getUserDetails", auth, getUserDetails)

// console.log('connected to profile routes')

module.exports = router