const express = require('express')
const {
    createCourse,
    getCourses,
    getCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all course routes
router.use(requireAuth)

/* ----------- router(course) ----------- */

// GET all courses
router.get('/',  getCourses)

// GET a single course
router.get('/:id', getCourse)

// POST a new course
router.post('/', createCourse)

// DELETE a course
router.delete('/:id', deleteCourse)

// UPDATE a course
router.patch('/:id', updateCourse)

module.exports = router