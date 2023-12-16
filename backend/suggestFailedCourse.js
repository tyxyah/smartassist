function suggestFailedCourses(currentSemesterData) {
    // Assuming "status" is the column indicating completion status
    var failedCourses = currentSemesterData.filter(course => course.status === false);
  
    // Extract unique failed course codes
    var uniqueFailedCourses = [...new Set(failedCourses.map(course => course.course_code))];
    return uniqueFailedCourses;
  }
  
  module.exports = {
    suggestFailedCourses: suggestFailedCourses
  };