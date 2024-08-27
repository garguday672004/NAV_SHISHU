// Import the required modules
const express = require("express")
const router = express.Router()

const { auth, isParent} = require('../middlewares/auth')

const {requestMother, updateParent, updateParentID, createParent, showAllSurrogateMothers} = require('../controllers/Parent')

router.post('/createParent', auth, isParent, createParent)
router.post('/updateParent', auth, isParent, updateParent)
router.post('/updateParentID', auth, isParent, updateParentID)
router.post('/requestMother', auth, isParent, requestMother)
router.get('/showAllSurrogateMothers', auth, isParent, showAllSurrogateMothers)

// TODO: add get routes for parent

// console.log('connected to parent routes')

module.exports = router