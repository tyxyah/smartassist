// runCourseSuggestion.js
const suggestFailedCoursesModule = require("./suggestFailedCourse");

async function runCourseSuggestion(modelName, currentSemester) {
  try {
    // Dynamically require the model based on the provided name
    const TrainingModel = require(`./models/${modelName}`);

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
