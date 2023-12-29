const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  createCourse,
} = require('../controllers/studySchemeController');
const requireAuth = require('../middleware/requireAuth');

// Require auth for all course routes
router.use(requireAuth);

// Define routes
router.get('/:modelName', (req, res) => getCourses(req, res, req.params.modelName));

router.get('/:modelName/:id', (req, res) => getCourse(req, res, req.params.modelName));

router.post('/:modelName', (req, res) => createCourse(req, res, req.params.modelName));

router.delete('/:modelName/:id', (req, res) => deleteCourse(req, res, req.params.modelName));

// UPDATE a course
router.patch('/:modelName/:id', (req, res) => updateCourse(req, res, req.params.modelName));

module.exports = router;
