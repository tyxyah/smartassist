// Function to check if prerequisites are completed for a given course
function arePrerequisitesCompleted(courseCode, coursesData) {

  console.log('Checking prerequisites for course:', courseCode);
  console.log('User courses:', courseCode);
  // Find the course in the dataset
  const course = coursesData.find((c) => c.course_code === courseCode);

  if (!course) {
    // Course not found, prerequisites are not completed
    return false;
  }

  // Check if the course has prerequisites
  if (course.prerequisite) {
    // Split multiple prerequisites by commas
    const prerequisiteCodes = course.prerequisite.split(',').map(code => code.trim());

    // Check if all prerequisites are successfully completed
    // some method checks if at least one element in the array satisfies the provided condition(multiple prerequisite)
    return prerequisiteCodes.some(code => {
      const prerequisiteCourse = coursesData.find((c) => c.course_code === code);
      return prerequisiteCourse && prerequisiteCourse.status;
    });
  }

  // No prerequisites, so they are considered completed
  return true;
}

module.exports = {
  arePrerequisitesCompleted,
};