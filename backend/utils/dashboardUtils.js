/*********filter Kokurikulum*/
const filterKokurikulum = async (StudySchemeModel, user_id) => {
  try {
    // Fetch user's courses from the study scheme model
    const userCourses = await StudySchemeModel.find({ user_id });

    // Filter courses with empty course_code and course names starting with "Ko"
    const filteredKokurikulum = userCourses.filter((course) => {
      const courseCode = course.course_code;
      const courseName = course.course_name;
      return !courseCode && courseName.toLowerCase().startsWith("ko");
    });

    return filteredKokurikulum;
  } catch (error) {
    // Handle errors during the filtering process
    console.error(`Error filtering Kokurikulum: ${error.message}`);
    throw new Error(`Error filtering Kokurikulum: ${error.message}`);
  }
};
/*********calculate Ko-kurikulum occurrence*/
const calculateKokurikulumOccurrences = async (StudySchemeModel, user_id) => {
  try {
    // Fetch all kokurikulum courses using the filterKokurikulum function
    const allKokurikulum = await filterKokurikulum(StudySchemeModel, user_id);

    // Initialize the result object
    const result = {
      Ko: {
        required: 0,
        completed: 0,
        progress: 0,
      }
    };

    allKokurikulum.forEach((course) => {
      // Increment the required count for the corresponding package in the result object
      result.Ko.required++;

      // Check if the status is true and increment the completed count
      if (course.status) {
        result.Ko.completed++;
      }
    });

    // Calculate progress percentage for the corresponding package and round to 2 decimal places
    result.Ko.progress = result.Ko.required > 0
      ? parseFloat(((result.Ko.completed / result.Ko.required) * 100).toFixed(2))
      : 0;

    return result;
  } catch (error) {
    // Handle errors during the calculation process
    console.error(`Error calculating Kokurikulum occurrences: ${error.message}`);
    throw new Error(`Error calculating Kokurikulum occurrences: ${error.message}`);
  }
};
/*********filter ELEX package*/
const filterELEx = async (StudySchemeModel, user_id) => {
  try {
    // Fetch user's courses from the study scheme model
    const userCourses = await StudySchemeModel.find({ user_id });

    // Filter courses with course codes starting with "LAX," "CEL," and "LPE"
    const filteredELExCourses = userCourses.filter((course) => {
      const courseCode = course.course_code.toUpperCase(); // Convert to uppercase for case-insensitive comparison
      return (
        courseCode.startsWith("LAX") ||
        courseCode.startsWith("CEL") ||
        courseCode.startsWith("LPE")
      );
    });

    return filteredELExCourses;
  } catch (error) {
    // Handle errors during the calculation process
    console.error(`Error filtering ELEx package: ${error.message}`);
    throw new Error(`Error filtering ELEx package: ${error.message}`);
  }
};
/*********calculate ELEX package progress*/
const calculateELExOccurrences = async (StudySchemeModel, user_id) => {
  try {
    // Fetch all ELEx courses using the filterELEx function
    const allELExCourses = await filterELEx(StudySchemeModel, user_id);

    // Initialize the result object
    const result = {
      LPE: { required: 0, completed: 0, progress: 0 },
      LAX: { required: 0, completed: 0, progress: 0 },
      CEL: { required: 0, completed: 0, progress: 0 },
    };

    allELExCourses.forEach((course) => {
      const courseCode = course.course_code.toUpperCase(); // Convert to uppercase for case-insensitive comparison

      // Extract the package (LPE, LAX, or CEL) from the course code
      const packageCode = courseCode.substring(0, 3);

      // Increment the required count for the corresponding package in the result object
      if (packageCode === "LAX") {
        result[packageCode].required += 6; // Multiply LAX requirement by 6
      } else {
        result[packageCode].required++;
      }

      // Check if the status is true and increment the completed count
      if (course.status) {
        if (packageCode === "LAX") {
          result[packageCode].completed += 6; // Multiply completed LAX count by 6
        } else {
          result[packageCode].completed++;
        }
      }

      // Calculate progress percentage for the corresponding package and round to 2 decimal places
      result[packageCode].progress = parseFloat(
        (
          (result[packageCode].completed / result[packageCode].required) *
          100
        ).toFixed(2)
      );
    });

    return result;
  } catch (error) {
    // Handle errors during the calculation process
    console.error(`Error calculating ELEx occurrences: ${error.message}`);
    throw new Error(`Error calculating ELEx occurrences: ${error.message}`);
  }
};
/*********filter ELEX package until current semester*/
const filterELExUntilCurrentSemester = async (
  StudySchemeModel,
  user_id,
  currentSemester
) => {
  try {
    // Fetch user's courses from the study scheme model
    const userCourses = await StudySchemeModel.find({ user_id });

    // Filter courses with course codes starting with "LAX," "CEL," and "LPE" until the current semester
    const filteredELExCourses = userCourses.filter((course) => {
      const courseCode = course.course_code.toUpperCase(); // Convert to uppercase for case-insensitive comparison
      const courseSemester = course.semester_id;

      return (
        (courseCode.startsWith("LAX") ||
          courseCode.startsWith("CEL") ||
          courseCode.startsWith("LPE")) &&
        courseSemester < currentSemester
      );
    });

    return filteredELExCourses;
  } catch (error) {
    // Handle errors during the calculation process
    console.error(
      `Error filtering ELEx package until current semester: ${error.message}`
    );
    throw new Error(
      `Error filtering ELEx package until current semester: ${error.message}`
    );
  }
};
/*********calculate ELEX package progress until current semester*/
const calculateELExOccurrencesUntilCurrentSemester = async (
  StudySchemeModel,
  user_id,
  currentSemester
) => {
  try {
    // Fetch all ELEx courses using the filterELEx function
    const allELExCourses = await filterELExUntilCurrentSemester(
      StudySchemeModel,
      user_id,
      currentSemester
    );

    // Initialize the result object
    const result = {
      LPE: { required: 0, completed: 0, progress: 0 },
      LAX: { required: 0, completed: 0, progress: 0 },
      CEL: { required: 0, completed: 0, progress: 0 },
      total: { required: 0, completed: 0, progress: 0 }, // New entry for total ELEx package
    };

    // Create a Set to keep track of unique ELEx course codes
    const uniqueELExCourseCodes = new Set();

    allELExCourses.forEach((course) => {
      const courseCode = course.course_code.toUpperCase(); // Convert to uppercase for case-insensitive comparison

      // Extract the package (LPE, LAX, or CEL) from the course code
      const packageCode = courseCode.substring(0, 3);

      // Increment the required count for the corresponding package in the result object
      if (packageCode === "LAX") {
        result[packageCode].required += 6; // Multiply LAX requirement by 6
      } else {
        result[packageCode].required++;
      }

      // Check if the status is true and increment the completed count
      if (course.status) {
        if (packageCode === "LAX") {
          result[packageCode].completed += 6; // Multiply completed LAX count by 6
        } else {
          result[packageCode].completed++;
        }
      }

      // Calculate progress percentage for the corresponding package and round to 2 decimal places
      result[packageCode].progress = parseFloat(
        (
          (result[packageCode].completed / result[packageCode].required) *
          100
        ).toFixed(2)
      );
    });

    // Increment the total required count for all ELEx packages
    result.total.required += result.LPE.required + result.LAX.required + result.CEL.required;

    // Increment the total completed count for all ELEx packages
    result.total.completed += result.LPE.completed + result.LAX.completed + result.CEL.completed;

    // Calculate progress percentage for the total ELEx package and round to 2 decimal places
    result.total.progress = parseFloat(
      ((result.total.completed / result.total.required) * 100).toFixed(2)
    );

    return result;
  } catch (error) {
    // Handle errors during the calculation process
    console.error(
      `Error calculating ELEx occurrences until current semester: ${error.message}`
    );
    throw new Error(
      `Error calculating ELEx occurrences until current semester: ${error.message}`
    );
  }
};
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
      const totalCompletedCreditHours =
        creditHoursDataPerSemester[semesterId].completed;
      const totalRequiredCreditHours =
        creditHoursDataPerSemester[semesterId].required;

      // Calculate progress for the semester
      const progress =
        totalRequiredCreditHours !== 0
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
      const totalCompletedCreditHours =
        creditHoursDataByCourseType[courseType].completed;
      const totalRequiredCreditHours =
        creditHoursDataByCourseType[courseType].required;

      // Calculate progress for the course type
      const progress =
        totalRequiredCreditHours !== 0
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
const calculateTotalCreditHoursUntilCurrentSemester = async (
  StudySchemeModel,
  user_id,
  currentSemester
) => {
 
  try {
    // Find user courses up until the current semester
    const userCourses = await StudySchemeModel.find({
      user_id,
      semester_id: { $lt: currentSemester },
    });

    // Initialize data structure to store credit hours information
    const creditHoursData = {
      required: 0,
      completed: 0,
      progress: 0,
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
        console.warn(
          `Invalid credit_hours value for course ${course._id}. Skipping.`
        );
      }
    });

    // Calculate progress for courses up until the current semester
    creditHoursData.progress =
      creditHoursData.required !== 0
        ? (
            (creditHoursData.completed / creditHoursData.required) *
            100
          ).toFixed(2)
        : 0;

    // Return the calculated credit hours data up until the current semester
    return creditHoursData;
  } catch (error) {
    console.error(
      `Error calculating credit hours up until the current semester: ${error.message}`
    );
    throw new Error(
      `Error calculating credit hours up until the current semester: ${error.message}`
    );
  }
};
/*********total credit hours to graduate */
const calculateTotalCreditHoursToGraduate = async (StudySchemeModel, user_id) => {
  try {
    // Fetch user's courses from the study scheme model
    const userCourses = await StudySchemeModel.find({ user_id });

    // Initialize variables to store credit hours information
    let requiredCreditHours = 0;
    let completedCreditHours = 0;
    let progress = 0;

    // Loop through each course and update the required and completed credit hours
    userCourses.forEach((course) => {
      const creditHours = parseFloat(course.credit_hours);

      // Check if credit_hours is a valid numeric value
      if (!isNaN(creditHours) && isFinite(creditHours)) {
        requiredCreditHours += creditHours;

        // Update completed credit hours only if the course is marked as completed
        if (course.status) {
          completedCreditHours += creditHours;
        }
      } else {
        console.warn(
          `Invalid credit_hours value for course ${course._id}. Skipping.`
        );
      }
    });

    // Calculate progress
    progress =
      requiredCreditHours !== 0
        ? ((completedCreditHours / requiredCreditHours) * 100).toFixed(2)
        : 0;

    // Return the calculated credit hours information
    return {
      required: requiredCreditHours,
      completed: completedCreditHours,
      progress,
    };
  } catch (error) {
    console.error(
      `Error calculating credit hours for graduation: ${error.message}`
    );
    throw new Error(
      `Error calculating credit hours for graduation: ${error.message}`
    );
  }
};
/*********total credit hours by semester and type*/
const calculateCreditHoursByCourseTypeAndSemester = async (StudySchemeModel, user_id) => {
  try {
    // Fetch user's courses from the study scheme model
    const userCourses = await StudySchemeModel.find({ user_id });

    // Initialize data structure to store results by semester and course type
    const creditHoursData = {};

    // Loop through each course and update the credit hours data
    userCourses.forEach((course) => {
      const semesterId = course.semester_id;
      const courseType = parseFloat(course.course_type);
      const creditHours = parseFloat(course.credit_hours);

      // Check if credit_hours is a valid numeric value
      if (isNaN(creditHours) || !isFinite(creditHours)) {
        console.warn(
          `Invalid credit_hours value for course ${course._id}. Skipping.`
        );
        return;
      }

      // Initialize semester data if not exists
      if (!creditHoursData[semesterId]) {
        creditHoursData[semesterId] = {};
      }

      // Initialize course type data if not exists
      if (!creditHoursData[semesterId][courseType]) {
        creditHoursData[semesterId][courseType] = {
          required: 0,
          completed: 0,
        };
      }

      // Update credit hours for the semester and course type
      creditHoursData[semesterId][courseType].required += creditHours;

      // Update completed credit hours only if the course is marked as completed
      if (course.status) {
        creditHoursData[semesterId][courseType].completed += creditHours;
      }
    });

    // Return the calculated credit hours data
    return creditHoursData;
  } catch (error) {
    // Handle errors during the calculation process
    console.error(
      `Error calculating credit hours by semester and course type: ${error.message}`
    );
    throw new Error(
      `Error calculating credit hours by semester and course type: ${error.message}`
    );
  }
};

module.exports = {
  calculateELExOccurrences,
  calculateELExOccurrencesUntilCurrentSemester,
  calculateCreditHoursBySemester,
  calculateCreditHoursByCourseType,
  calculateTotalCreditHoursToGraduate,
  calculateTotalCreditHoursUntilCurrentSemester,
  calculateKokurikulumOccurrences,
  calculateCreditHoursByCourseTypeAndSemester,
};
