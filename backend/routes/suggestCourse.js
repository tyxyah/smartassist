const express = require('express');
const courseController = require('../controllers/suggestCourseController');

const router = express.Router();

router.post('/', courseController.suggestCourses);

module.exports = router;
