function updatePrerequisiteStatus(courseCode, coursesData) {
  // Find the course in the dataset
  const course = coursesData.find((c) => c.course_code === courseCode);

  // Check if the course has a prerequisite
  if (course && course.prerequisite) {
    // Find the prerequisite course in the dataset
    const prerequisiteCourse = coursesData.find((c) => c.course_code === course.prerequisite);

    // Check if the prerequisite course exists and has been successfully completed
    if (prerequisiteCourse && prerequisiteCourse.status) {
      // If the prerequisite is completed, update the status for the current course
      course.status = true;
    } else {
      // If the prerequisite is not completed, update the status for the current course and related courses to false
      course.status = false;

      // Find all courses that have the current course as a prerequisite
      const relatedCourses = coursesData.filter((c) => c.prerequisite === courseCode);

      // Update the status for all related courses to false
      relatedCourses.forEach((relatedCourse) => {
        relatedCourse.status = false;
      });
    }
  } else {
    // No prerequisite, so update is allowed
    course.status = true;
  }

  return coursesData;
}
  
  module.exports = {
    updatePrerequisiteStatus,
  };
  