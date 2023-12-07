const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// define the data structure
const studentSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    student_type: {
        type: String,
        required: true
    },
    muet: {
        type: String,
        required: true
    },
    start_session: {
        type: String,
        required: true
    },
    current_semester: {
        type: Number,
        required: true
    },
})

//static sigup method
studentSchema.statics.signup = async function(email, username, password, student_type, start_session, muet, current_semester) {

    //vaidation
    if (!email || !password || !username || !student_type || !start_session || !muet || !current_semester) {
        throw Error('Please fill in all required fields.')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email format. Please enter a correct email address.')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password should be at least 8 characters long and include a combination of letters, numbers, and symbols.')
    }

    const exists = await this.findOne({ email, username })

    if (exists) {
        throw Error('Username already exists. Please try a different username.')
    }

    const existingEmailUser = await this.findOne({ email });

    if (existingEmailUser) {
        throw Error('This email address is already registered. Please log in or use a different email.');
    }

    const existingUsernameUser = await this.findOne({ username });

    if (existingUsernameUser) {
        throw Error('This username is already registered. Please log in or choose a different username for new registrations');
    }

    //hashed the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
 
    const user = await this.create({ email, username, password: hash, student_type, start_session, muet, current_semester })

    return user
}

//static login method
studentSchema.statics.login = async function(username, password){
   
    if (!password || !username) {
        throw Error('Please fill in all required fields.')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Invalid credentials. Verify your login details and attempt to log in once more.')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid credentials. Verify your login details and attempt to log in once more.')
    }

    return user
}

module.exports = mongoose.model('Student', studentSchema)
