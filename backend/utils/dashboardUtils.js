/*********each semester */
const calculateCreditHoursBySemester = async (StudySchemeModel, user_id) => {
    try {
      // Fetch user's courses from the study scheme model
      const userCourses = await StudySchemeModel.find({ user_id });
      const creditHoursDataPerSemester = {}; // Initialize data structure to store results per semester
  
      // Loop through each course and update the credit hours data
      userCourses.forEach((course) => {
        const semesterId = course.semester_id;
        const creditHours = parseFloat(course.credit_hours);
  
        // Check if credit_hours is a valid numeric value
        if (isNaN(creditHours) || !isFinite(creditHours)) {
          console.warn(
            `Invalid credit_hours value for course ${course._id}. Skipping.`
          );
          return;
        }
  
        // Initialize semester data if not exists
        if (!creditHoursDataPerSemester[semesterId]) {
          creditHoursDataPerSemester[semesterId] = {
            required: 0,
            completed: 0,
            progress: 0,
          };
        }
  
        // Update required credit hours for the semester
        creditHoursDataPerSemester[semesterId].required += creditHours;
  
        // Update completed credit hours only if the course is marked as completed
        if (course.status) {
          creditHoursDataPerSemester[semesterId].completed += creditHours;
        }
      });
  
      // Calculate progress for each semester based on completed and required credit hours
      for (const semesterId in creditHoursDataPerSemester) {
        const totalCompletedCreditHours = creditHoursDataPerSemester[semesterId].completed;
        const totalRequiredCreditHours = creditHoursDataPerSemester[semesterId].required;
  
        // Calculate progress for the semester
        const progress = totalRequiredCreditHours !== 0
          ? (totalCompletedCreditHours / totalRequiredCreditHours) * 100
          : 0;
  
        // Update progress in the data structure
        creditHoursDataPerSemester[semesterId].progress = progress.toFixed(2);
      }
  
      // Return the calculated credit hours data per semester
      return creditHoursDataPerSemester;
    } catch (error) {
      // Handle errors during the calculation process
      console.error(
        `Error calculating credit hours by semester: ${error.message}`
      );
      throw new Error(
        `Error calculating credit hours by semester: ${error.message}`
      );
    }
  };
/*********course type */
  const calculateCreditHoursByCourseType = async (StudySchemeModel, user_id) => {
    try {
      const userCourses = await StudySchemeModel.find({ user_id });
      const creditHoursDataByCourseType = {}; // Initialize data structure to store results by course type
  
      userCourses.forEach((course) => {
        const courseType = parseFloat(course.course_type);
        const creditHours = parseFloat(course.credit_hours);
  
        if (isNaN(creditHours) || !isFinite(creditHours)) {
          console.warn(
            `Invalid credit_hours value for course ${course._id}. Skipping.`
          );
          return;
        }
  
        if (!creditHoursDataByCourseType[courseType]) {
          creditHoursDataByCourseType[courseType] = {
            required: 0,
            completed: 0,
            progress: 0,
          };
        }
  
        // Update required credit hours for the course type
        creditHoursDataByCourseType[courseType].required += creditHours;
  
        // Update completed credit hours only if the course is marked as completed
        if (course.status) {
          creditHoursDataByCourseType[courseType].completed += creditHours;
        }
      });
  
      // Calculate progress for each course type based on completed and required credit hours
      for (const courseType in creditHoursDataByCourseType) {
        const totalCompletedCreditHours = creditHoursDataByCourseType[courseType].completed;
        const totalRequiredCreditHours = creditHoursDataByCourseType[courseType].required;
  
        // Calculate progress for the course type
        const progress = totalRequiredCreditHours !== 0
          ? (totalCompletedCreditHours / totalRequiredCreditHours) * 100
          : 0;
  
        // Update progress in the data structure
        creditHoursDataByCourseType[courseType].progress = progress.toFixed(2);
      }
  
      // Return the calculated credit hours data by course type
      return creditHoursDataByCourseType;
    } catch (error) {
      console.error(
        `Error calculating credit hours by course type: ${error.message}`
      );
      throw new Error(
        `Error calculating credit hours by course type: ${error.message}`
      );
    }
  };
/*********total credit hours until current semester */
const calculateTotalCreditHoursUntilCurrentSemester = async (StudySchemeModel, user_id, currentSemester) => {
  const totalCredit = await calculateTotalCreditHoursToGraduate(StudySchemeModel, user_id)
    try {
  
      // Find user courses up until the current semester
      const userCourses = await StudySchemeModel.find({ user_id, semester_id: { $lte: currentSemester } });
  
      // Initialize data structure to store credit hours information
      const creditHoursData = {
        required: 0,
        completed: 0,
        progress: 0,
        totalCredit: totalCredit,
      };
  
      // Calculate credit hours for courses up until the current semester
      userCourses.forEach((course) => {
        const creditHours = parseFloat(course.credit_hours);
  
        if (!isNaN(creditHours) && isFinite(creditHours)) {
          // Update required credit hours
          creditHoursData.required += creditHours;
  
          // Update completed credit hours only if the course is marked as completed
          if (course.status) {
            creditHoursData.completed += creditHours;
          }
        } else {
          console.warn(`Invalid credit_hours value for course ${course._id}. Skipping.`);
        }
      });
  
      // Calculate progress for courses up until the current semester
      creditHoursData.progress = creditHoursData.required !== 0
        ? ((creditHoursData.completed / creditHoursData.required) * 100).toFixed(2)
        : 0;
  
      // Return the calculated credit hours data up until the current semester
      return creditHoursData;
    } catch (error) {
      console.error(`Error calculating credit hours up until the current semester: ${error.message}`);
      throw new Error(`Error calculating credit hours up until the current semester: ${error.message}`);
    }
  };  

  const calculateTotalCreditHoursToGraduate = async (StudySchemeModel, user_id) => {
    try {
      // Fetch user's courses from the study scheme model
      const userCourses = await StudySchemeModel.find({ user_id });
  
      // Initialize variable to store total credit hours needed
      let totalCreditHoursToGraduate = 0;
  
      // Loop through each course and update the total credit hours needed
      userCourses.forEach((course) => {
        const creditHours = parseFloat(course.credit_hours);
  
        // Check if credit_hours is a valid numeric value
        if (!isNaN(creditHours) && isFinite(creditHours)) {
          totalCreditHoursToGraduate += creditHours;
        } else {
          console.warn(`Invalid credit_hours value for course ${course._id}. Skipping.`);
        }
      });
  
      // Return the total credit hours needed to graduate
      return totalCreditHoursToGraduate;
    } catch (error) {
      console.error(`Error calculating total credit hours to graduate: ${error.message}`);
      throw new Error(`Error calculating total credit hours to graduate: ${error.message}`);
    }
  };

  module.exports = {
    calculateCreditHoursBySemester,
    calculateCreditHoursByCourseType,
    calculateTotalCreditHoursUntilCurrentSemester,
  };
  