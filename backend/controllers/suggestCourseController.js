const {suggestFailedCourses} = require('../suggestFailedCourse');

exports.suggestCourses = async (req, res) => {
  const { currentSemester } = req.body;

  try {
    const failedCourses = await suggestFailedCourses(currentSemester);
    res.status(200).json({ message: 'Course suggestion completed successfully.', failedCourses });
  } catch (error) {
    console.error('Error during course suggestion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
