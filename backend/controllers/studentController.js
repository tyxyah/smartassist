const Student = require("../models/studentModel");
const jwt = require("jsonwebtoken");

//create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginStudent = async (req, res) => {
  const { username, password, _id } = req.body;

  try {
    const user = await Student.login(username, password, _id);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupStudent = async (req, res) => {
  const {
    email,
    username,
    password,
    student_type,
    start_session,
    muet,
    current_semester,
  } = req.body;

  try {
    const user = await Student.signup(
      email,
      username,
      password,
      student_type,
      start_session,
      muet,
      current_semester
    );

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get user details by token
const getStudentDetails = async (req, res) => {
  try {
    // Extract student ID from the token
    const userId = req.user && req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Retrieve user details by ID
    const user = await Student.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      _id,
      username,
      email,
      start_session,
      muet,
      current_semester,
    } = user;

    res.status(200).json({
      _id,
      username,
      email,
      start_session,
      muet,
      current_semester,
    });
  } catch (error) {
    console.error("Error getting student details:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { signupStudent, loginStudent, getStudentDetails };
