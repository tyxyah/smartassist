const express = require('express')

//controller functions
const { signupStudent, loginStudent } = require('../controllers/studentController')

const router = express.Router()

/* ----------- router(student) ----------- */

//login route
router.post('/login', loginStudent)

//signup route
router.post('/signup', signupStudent)

module.exports = router