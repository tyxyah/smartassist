const runCourseSuggestion = require('../runCourseSuggestion');

exports.suggestCourses = async (req, res) => {
  const { modelName, currentSemester } = req.body;

  try {
    const failedCourses = await runCourseSuggestion(modelName, currentSemester);
    res.status(200).json({ message: 'Course suggestion completed successfully.', failedCourses });
  } catch (error) {
    console.error('Error during course suggestion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
