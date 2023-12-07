const SS202112 = require("../models/202112Model");
const mongoose = require("mongoose");

// get all courses
const getCourses = async (req, res) => {
  const user_id = req.user._id

  const courses = await SS202112.find({ user_id }).sort({ cretedAt: -1 });

  res.status(200).json(courses);
};

// get a single course
const getCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course" });
  }

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

// create new course
const createCourse = async (req, res) => {
  const {
    semester_id,
    course_code,
    course_name,
    credit_hours,
    prerequisite,
    course_type,
    status
  } = req.body;

  // add doc to db
  try {
    const user_id = req.user._id
    const course = await SS202112.create({
      semester_id,
      course_code,
      course_name,
      course_type,
      credit_hours,
      prerequisite,
      status,
      user_id
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such course" });
  }

  const course = await Course.findOneAndDelete({ _id: id });

  if (!course) {
    return res.status(400).json({ error: "No such course" });
  }
  res.status(200).json(course);
};

// update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such course" });
  }

  const course = await SS202112.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!course) {
    return res.status(400).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
};