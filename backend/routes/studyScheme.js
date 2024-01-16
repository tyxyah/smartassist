const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  updateAllCoursesCompleted,
  suggestFailedCourses,
  checkPrerequisites,
} = require('../controllers/studySchemeController');
const requireAuth = require('../middleware/requireAuth');

// Require auth for all course routes
router.use(requireAuth);

// Define routes
router.get('/', (req, res) => getCourses(req, res));

router.get('/:id', (req, res) => getCourse(req, res));

router.delete('/:modelName/:id', (req, res) => deleteCourse(req, res, req.params.modelName));

router.patch('/update-all', updateAllCoursesCompleted);

router.patch('/:id', (req, res) => updateCourse(req, res));

// Route for suggesting failed courses
router.post('/suggest-failed-courses', (req,res) => suggestFailedCourses(req, res));

router.post('/check-prerequisites', checkPrerequisites);

module.exports = router;
