const Student = require('../models/studentModel')
const jwt = require('jsonwebtoken')

//create token
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginStudent = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await Student.login(username, password)

    //create token
    const token = createToken(user._id)

    res.status(200).json({username, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//signup user
const signupStudent= async (req, res) => {
  const {email, username, password, student_type, start_session, muet, current_semester} = req.body 

  try {
    const user = await Student.signup(email, username, password, student_type, start_session, muet, current_semester)

    //create token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupStudent, loginStudent}