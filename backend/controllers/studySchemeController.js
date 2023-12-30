//import model file
const {
  StudyScheme11,
  StudyScheme12,
  StudyScheme13,
} = require('../models/studySchemeModel');

const Student = require('../models/studentModel');

const { suggestFailedCourses } = require('../suggestFailedCourse');

// Check if modelName is a valid string
const isValidString = (str) => {
  return typeof str === 'string' && str.trim() !== '';
};

// Helper function to get StudySchemeModel based on modelName
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

// Function to get all courses
const getCourses = async (req, res) => {
  const user_id = req.user._id;
  const modelName = req.params.modelName;

  const StudySchemeModel = getStudySchemeModel(modelName);

  if (!isValidString(modelName) || !StudySchemeModel) {
    return res.status(400).json({ error: 'Invalid modelName' });
  }

  const courses = await StudySchemeModel.find({ user_id }).sort({
    createdAt: -1,
  });

  console.log(`getCourses - Model: ${modelName}, User ID: ${user_id}`);
  res.status(200).json(courses);
};

// Function to get a single course
const getCourse = async (req, res) => {
  const { id, modelName } = req.params;

  const StudySchemeModel = getStudySchemeModel(modelName);

  if (!isValidString(modelName) || !StudySchemeModel) {
    return res.status(400).json({ error: 'Invalid modelName' });
  }

  const course = await StudySchemeModel.findById(id);
  console.log(`getCourse - Model: ${modelName}, Course ID: ${id}`);

  if (!course) {
    console.log(`Course not found - Model: ${modelName}, Course ID: ${id}`);
    return res.status(404).json({ error: 'No such course' });
  }

  res.status(200).json(course);
};

// Function to delete a course
const deleteCourse = async (req, res) => {
  const { id, modelName } = req.params;

  const StudySchemeModel = getStudySchemeModel(modelName);

  if (!isValidString(modelName) || !StudySchemeModel) {
    return res.status(400).json({ error: 'Invalid modelName' });
  }

  const course = await StudySchemeModel.findOneAndDelete({ _id: id });
  console.log(`deleteCourse - Model: ${modelName}, Course ID: ${id}`);

  if (!course) {
    console.log(`Course not found - Model: ${modelName}, Course ID: ${id}`);
    return res.status(404).json({ error: 'No such course' });
  }
  res.status(200).json(course);
};

// Function to update a course
const updateCourse = async (req, res) => {
  const { id, modelName } = req.params;

  const StudySchemeModel = getStudySchemeModel(modelName);

  if (!isValidString(modelName) || !StudySchemeModel) {
    return res.status(400).json({ error: 'Invalid modelName' });
  }

  const course = await StudySchemeModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  console.log(`updateCourse - Model: ${modelName}, Course ID: ${id}`);

  if (!course) {
    console.log(`Course not found - Model: ${modelName}, Course ID: ${id}`);
    return res.status(404).json({ error: 'No such course' });
  }

  res.status(200).json(course);
};

// Function to suggest failed courses
const suggestFailedCoursesController = async (req, res) => {
  const user_id = req.user._id;
  const modelName = req.params.modelName;

  const StudySchemeModel = getStudySchemeModel(modelName);

  if (!isValidString(modelName) || !StudySchemeModel) {
    return res.status(400).json({ error: 'Invalid modelName' });
  }

  try {
    // Fetch the user instance to get the current_semester
    const student = await Student.findOne({ _id: user_id });

    if (!student) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Access the current_semester field
    const current_semester = student.current_semester;

    // Use the suggestFailedCourses function from the helper file
    const failedCourses = await suggestFailedCourses(StudySchemeModel, user_id, current_semester);

    res.status(200).json({ suggestedCourses: failedCourses });
  } catch (error) {
    console.error('Error suggesting failed courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  suggestFailedCourses: suggestFailedCoursesController
};
