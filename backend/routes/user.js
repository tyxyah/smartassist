const express = require('express')

//controller functions
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

/* ----------- router(user) ----------- */

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router