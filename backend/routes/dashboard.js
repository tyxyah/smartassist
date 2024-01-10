const express = require("express");
const router = express.Router();
const {
    getCreditHoursByType,
    getCreditHoursBySemester,
    getCreditHoursByCurrentSemester,} = require("../controllers/dashboardController");
const requireAuth = require('../middleware/requireAuth');

// Require auth for all routes
router.use(requireAuth);

// Define routes
router.get('/', (req, res) => getDashboardData(req, res));

router.delete('/:id', (req, res) => deleteDashboardCourse(req, res));

router.patch('/:id', (req, res) => updateDashboardCourse(req, res));

// Route for getting credit hours by type
router.get('/credit-hours-by-type', (req, res) => getCreditHoursByType(req, res));

// Route for getting credit hours by semester
router.get('/credit-hours-by-semester', (req, res) => getCreditHoursBySemester(req, res));

// Route for getting credit hours by current semester
router.get('/credit-hours-until-current-semester', (req, res) => getCreditHoursByCurrentSemester(req, res));

module.exports = router;
