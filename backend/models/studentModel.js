const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const path = require('path');
const { connectToUserDatabase } = require('../db');
const { importStudySchemeCsvToDB } = require('../importCsvFilesToDB');

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
        type: Number,
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

// Static signup method
studentSchema.statics.signup = async function (
    email,
    username,
    password,
    student_type,
    start_session,
    muet,
    current_semester
) {
    // Validation
    if (!email || !password || !username || !student_type || !start_session || !muet || !current_semester) {
        throw Error('Please fill in all required fields.');
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email format. Please enter a correct email address.');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password should be at least 8 characters long and include a combination of letters, numbers, and symbols.');
    }

    // Check if the user already exists
    const exists = await this.findOne({ email, username });
    if (exists) {
        throw Error('Username or email already exists. Please try a different username or email.');
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
        // Create the user
        const user = await this.create({ email, username, password: hash, student_type, start_session, muet, current_semester });

        // Construct the CSV file path
        const csvFilePath = path.resolve(__dirname, `../csv_files/${start_session}_${muet}.csv`);
        console.log(csvFilePath);

        // Call the import function with the provided parameters
        await importStudySchemeCsvToDB(csvFilePath, user._id, start_session, muet, student_type);

        // Log the success message
        console.log('Study scheme import completed for the user with ID:', user._id, 'student type', student_type);

        return user;
    } catch (error) {
        console.error('Error during user creation:', error);
        throw error; // Propagate the error to handle it appropriately in your application
    }
};

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

const studentDB = connectToUserDatabase();
module.exports = studentDB.model("Student", studentSchema);
