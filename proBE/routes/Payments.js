// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../controllers/Payments")
const { auth, isMother, isParent, isAdmin } = require("../middlewares/auth")

router.post("/capturePayment", auth, capturePayment)
router.post("/verifySignature", verifySignature)

// console.log('connected to payment routes')

module.exports = router