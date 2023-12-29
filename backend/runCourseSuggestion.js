const suggestFailedCoursesModule = require("./suggestFailedCourse");
const {
  StudyScheme11,
  StudyScheme12,
  StudyScheme13,
} = require('./models/studySchemeModel');

// Helper function to get StudySchemeModel to train the model
const getStudySchemeModel = (modelName) => {
  switch (modelName) {
    case 'StudyScheme11':
      return StudyScheme11;
    case 'StudyScheme12':
      return StudyScheme12;
    case 'StudyScheme13':
      return StudyScheme13;
    default:
      return null;
  }
};

async function runCourseSuggestion(modelName, currentSemester) {
  try {
    // Dynamically require the model based on the provided name
    const TrainingModel = getStudySchemeModel(modelName);

    // Connect to the MongoDB database
    const allData = await TrainingModel.find({
      semester_id: { $lte: currentSemester },
    });

    // Use the direct filtering approach to suggest failed courses
    const failedCourses =
      suggestFailedCoursesModule.suggestFailedCourses(allData);
    return failedCourses;
  } catch (error) {
    console.error(`Error: Unable to find model ${modelName}.`, error);
  }
}

module.exports = runCourseSuggestion;
