const express = require('express')
const requireAuth = require('../middleware/requireAuth'); // Import the middleware

//controller functions
const { signupStudent, loginStudent, getStudentDetails, updateCurrentSemester } = require('../controllers/studentController')

const router = express.Router()

/* ----------- router(student) ----------- */

//login route
router.post('/login', loginStudent)

//signup route
router.post('/signup', signupStudent)

//get student
router.get('/', requireAuth, (req, res)=> getStudentDetails(req, res))

router.patch('/update-current-semester', requireAuth, updateCurrentSemester);

module.exports = router