// Function to suggest failed courses
const suggestFailedCourses = async (StudySchemeModel, user_id, currentSemester) => {
  try {
    // Log parameters for debugging
    console.log('user_id:', user_id);
    console.log('currentSemester:', currentSemester);

    // Fetch courses for the specified user_id with a status of false and semester_id less than currentSemester
    const courses = await StudySchemeModel.find(
      {
        user_id,
        status: false,
        semester_id: { $lt: currentSemester },
      },
      { course_code: 1, course_name: 1, course_type: 1 } // Include the specified fields in the result
    )
    .sort({ semester_id: 1 }); // Sort the result in ascending order by semester_id

    // Log the result for debugging
    console.log('Courses:', courses);

    // Check if courses is an array before proceeding
    if (!Array.isArray(courses)) {
      throw new Error('Invalid data format: expected an array');
    }

    // Return the array of courses
    return courses;
  } catch (error) {
    console.error(`Error suggesting failed courses: ${error.message}`);
    throw new Error(`Error suggesting failed courses: ${error.message}`);
  }
};

module.exports = {
  suggestFailedCourses,
};
