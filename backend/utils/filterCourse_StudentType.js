function filterCourseCodes(courseCodes, studentType) {
  // Filter courses based on the provided conditions
  const filteredCourses = courseCodes.filter((course) => {
    if (studentType === 1) {
      // Include courses that match the conditions for local students
      return !course.includes("**");
    }

    if (studentType === 2) {
      // Include courses for international students that don't have "*"
      return !course.includes("*") || course.includes("**");
    }
  });

  return filteredCourses;
}

module.exports = { filterCourseCodes };
