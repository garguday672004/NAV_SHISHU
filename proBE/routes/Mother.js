// Import the required modules
const express = require("express")
const router = express.Router()

const { auth, isMother} = require("../middlewares/auth")

const {createSurrogate, updateSurrogateDetails, updateSurrogateID, getSurrogateDetails, showRequestedParents} = require('../controllers/Surrogate')

const {createHealth, updateHealth} = require('../controllers/Health')

router.post('/createSurrogate', auth, isMother, createSurrogate)
router.post('/updateSurrogateDetails', auth, isMother, updateSurrogateDetails)
router.post('/updateSurrogateID', auth, isMother, updateSurrogateID)
router.get('/getSurrogateDetails', auth, isMother, getSurrogateDetails)

router.get('/showRequestedParents', auth, isMother, showRequestedParents)

router.post('/createHealth', auth, isMother, createHealth)
router.post('/updateHealth', auth, isMother, updateHealth)

// TODO: add get routes for Mother

// console.log('connected to mother routes')

module.exports = router