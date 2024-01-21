//import model file
const {
  StudyScheme11,
  StudyScheme12,
  StudyScheme13,
} = require("../models/studySchemeModel");

const Student = require("../models/studentModel");
const { updateCourseStatus } = require("../utils/updateCourseStatus");
const { suggestFailedCourses } = require("../utils/suggestFailedCourse");
const {
  arePrerequisitesCompleted,
} = require("../utils/arePrerequisiteCompleted");

// Check if modelName is a valid string
const isValidString = (str) => {
  return typeof str === "string" && str.trim() !== "";
};

// Helper function to get StudySchemeModel based on modelName
const getStudySchemeModel = (modelName) => {
  switch (modelName) {
    case "StudyScheme11":
      return StudyScheme11;
    case "StudyScheme12":
      return StudyScheme12;
    case "StudyScheme13":
      return StudyScheme13;
    default:
      return null;
  }
};

// Function to get all courses
const getCourses = async (req, res) => {
  try {
    const user_id = req.user._id;

    // Your logic to fetch user data (start_session and muet)
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    // Construct the model name based on user data
    const modelName = `StudyScheme${user.start_session}${user.muet}`;

    // Get the StudySchemeModel based on the dynamically determined modelName
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    const courses = await StudySchemeModel.find({ user_id }).sort({
      createdAt: -1,
    });

    console.log(`getCourses - Model: ${modelName}, User ID: ${user_id}`);
    res.status(200).json({ current_semester: user.current_semester, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get a single course
const getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const user_id = req.user._id;

    // Your logic to fetch user data (start_session and muet)
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    // Construct the model name based on user data
    const modelName = `StudyScheme${user.start_session}${user.muet}`;

    // Get the StudySchemeModel based on the dynamically determined modelName
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    const course = await StudySchemeModel.findById(id);

    if (!course) {
      console.log(`Course not found - Model: ${modelName}, Course ID: ${id}`);
      return res.status(404).json({ error: "No such course" });
    }

    console.log(`getCourse - Model: ${modelName}, Course ID: ${id}`);
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a course
const deleteCourse = async (req, res) => {
  const { id, modelName } = req.params;

  const StudySchemeModel = getStudySchemeModel(modelName);

  if (!isValidString(modelName) || !StudySchemeModel) {
    return res.status(400).json({ error: "Invalid modelName" });
  }

  const course = await StudySchemeModel.findOneAndDelete({ _id: id });
  console.log(`deleteCourse - Model: ${modelName}, Course ID: ${id}`);

  if (!course) {
    console.log(`Course not found - Model: ${modelName}, Course ID: ${id}`);
    return res.status(404).json({ error: "No such course" });
  }
  res.status(200).json(course);
};

/**update course by id */
const updateCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const user_id = req.user._id;

    // Your logic to fetch user data (start_session and muet)
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    // Construct the model name based on user data
    const modelName = `StudyScheme${user.start_session}${user.muet}`;

    // Get the StudySchemeModel based on the dynamically determined modelName
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      console.log(`Invalid modelName: ${modelName}`);
      return res.status(400).json({ error: "Invalid modelName" });
    }

    // Fetch all courses for the user
    const userCourses = await StudySchemeModel.find({
      user_id: user._id,
    });

    // Fetch the course without updating it
    const existingCourse = await StudySchemeModel.findOne({
      _id: id,
      user_id: user._id,
    });

    if (!existingCourse) {
      console.log(`Course not found - Model: ${modelName}, Course ID: ${id}`);
      return res.status(404).json({ error: "No such course" });
    }

    // Assuming `arePrerequisitesCompleted` function checks prerequisites for a specific course
    const completedPrerequisite = arePrerequisitesCompleted(
      existingCourse.course_code,
      userCourses
    );

    let updatedStatus;

    if (!completedPrerequisite) {
      // Prerequisites not completed, set status to false
      console.log("Prerequisites not completed. Setting status to false.");
      updatedStatus = false;
    } else {
      // Prerequisites completed, set status based on user input
      console.log(
        "Prerequisites completed. Setting status based on user input."
      );
      updatedStatus = req.body.status; // Assuming `status` is a property in req.body
    }

    // Update the course based on the determined status
    const updatedCourse = await StudySchemeModel.findOneAndUpdate(
      { _id: id, user_id: user._id },
      { ...req.body, status: updatedStatus },
      { new: true }
    );

    if (!updatedCourse) {
      console.log(
        `Course not found after update - Model: ${modelName}, Course ID: ${id}`
      );
      return res.status(404).json({ error: "No such course" });
    }

    console.log(`updateCourse - Model: ${modelName}, Course ID: ${id}`);

    //Change all course that has current course as pre requisite to fail
    if (updatedStatus === false) {
      const coursesWithPrerequisite = updateCourseStatus(existingCourse.course_code, userCourses);
      // Update all courses based on prerequisite check
      coursesWithPrerequisite.map(async (course,index) =>{
        const print = await StudySchemeModel.findOneAndUpdate(
          { _id: course._id, user_id: user._id },
          { status: false },
          { new: true }
        );
        console.log("HEELO",print)
    
      })
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to suggest failed courses
const suggestFailedCoursesController = async (req, res) => {
  const user_id = req.user._id;

  try {
    // Logic to fetch user data (start_session and muet)
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    // Construct the model name based on user data
    const modelName = `StudyScheme${user.start_session}${user.muet}`;

    // Get the StudySchemeModel based on the dynamically determined modelName
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    // Call suggestFailedCourses with the correct parameters
    const suggestedCourses = await suggestFailedCourses(
      StudySchemeModel,
      user_id,
      user.current_semester
    );

    res.status(200).json({ suggestedCourses });
  } catch (error) {
    console.error("Error suggesting failed courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update all courses to completed for a user
const updateAllCoursesCompleted = async (req, res) => {
  const user_id = req.user._id;
  const { semesterId } = req.body; // Assuming semesterId is provided in the request body

  try {
    // Fetch user data
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    // Construct the model name based on user data
    const modelName = `StudyScheme${user.start_session}${user.muet}`;

    // Get the StudySchemeModel based on the dynamically determined modelName
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    // Fetch all courses for the user and the specified semester
    const userCourses = await StudySchemeModel.find({
      user_id: user._id,
      semester_id: semesterId,
    });

    // Update all courses based on prerequisite check
    await Promise.all(
      userCourses.map(async (course) => {
        // Assuming `arePrerequisitesCompleted` function checks prerequisites for a specific course
        const prerequisitesCompleted = arePrerequisitesCompleted(
          course.course_code,
          userCourses
        );

        // Set status based on prerequisite check
        course.status = prerequisitesCompleted;

        try {
          // Save the updated course and handle potential errors
          await course.save();
        } catch (saveError) {
          console.error(`Error saving course ${course._id}:`, saveError);
          throw new Error("Error updating courses");
        }
      })
    );

    console.log(
      `All courses marked as completed for Semester ${semesterId} - Model: ${modelName}, User ID: ${user_id}`
    );

    // Optionally, return the updated courses in the response
    res.status(200).json({
      message: `All courses marked as completed for Semester ${semesterId}`,
      updatedCourses: userCourses,
    });
  } catch (error) {
    console.error("Error updating all courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to check prerequisites
const checkPrerequisites = async (req, res) => {
  const { courseCode } = req.body;
  const user_id = req.user._id;

  try {
    // Fetch user data
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    // Construct the model name based on user data
    const modelName = `StudyScheme${user.start_session}${user.muet}`;

    // Get the StudySchemeModel based on the dynamically determined modelName
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    // Fetch the user's courses for prerequisite check
    const userCourses = await StudySchemeModel.find({
      user_id: user_id,
    });

    // Check if prerequisites are completed using your utility function
    const prerequisitesCompleted = arePrerequisitesCompleted(
      courseCode,
      userCourses
    );

    // Return the result of the prerequisite check
    res.json({ prerequisitesCompleted });
  } catch (error) {
    console.error("Error checking prerequisites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  updateAllCoursesCompleted,
  suggestFailedCourses: suggestFailedCoursesController,
  checkPrerequisites,
};
