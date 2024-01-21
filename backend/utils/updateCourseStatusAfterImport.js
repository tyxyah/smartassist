// Function to update course status after importing
async function updateCourseStatusAfterImport(insertedData, current_semester) {
    try {
        // Loop through the inserted data and update course status
         // Loop through the inserted data and update course status
         for (const courseData of insertedData) {
            // Assuming 'status' and 'semester' are fields in your model representing course status and semester
            if (courseData.semester_id < current_semester) {
                courseData.status = true;
                await courseData.save();
                console.log('Course Updated:', courseData);
            }
        }

        console.log('Course status update after import completed.');
    } catch (error) {
        console.error('Error during course status update after import:', error);
        throw error; // Propagate the error to handle it appropriately in your application
    }
}

module.exports = { updateCourseStatusAfterImport };
