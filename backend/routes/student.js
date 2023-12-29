const express = require('express')

//controller functions
const { signupStudent, loginStudent, getStudentDetails } = require('../controllers/studentController')

const router = express.Router()

/* ----------- router(student) ----------- */

//login route
router.post('/login', loginStudent)

//signup route
router.post('/signup', signupStudent)

//get student
router.get('/:id', getStudentDetails)

module.exports = router