// Function to check prerequisites and update status
function updateCourseStatus(courseCode, courses) {
// console.log("Adly",courses)
const coursesWithPrerequisite = courses.filter((course)=>{
    const prereq = course.prerequisite.split(',').map(code => code.trim());
    return prereq.find((e)=> (e===courseCode)) 
})
console.log("Adly",coursesWithPrerequisite)
// return 
return (coursesWithPrerequisite.map((course)=> {
    const newObj = {...course.toObject(),status: false}
    return newObj;
}))
}

module.exports = {
    updateCourseStatus,
  };
