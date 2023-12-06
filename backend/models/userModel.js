const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// define the data structure
const userSchema = new Schema({
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
    user_type: {
        type: String,
        required: false
    },
    muet_band: {
        type: String,
        required: false
    },
    start_session: {
        type: String,
        required: false
    },
    current_semester: {
        type: Number,
        required: false
    },
})

//static sigup method
userSchema.statics.signup = async function(email, username, password) {

    //vaidation
    if (!email || !password || !username) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email, username })

    if (exists) {
        throw Error('User already exist')
    }

    const existingEmailUser = await this.findOne({ email });

    if (existingEmailUser) {
        throw Error('Email already in use');
    }

    const existingUsernameUser = await this.findOne({ username });

    if (existingUsernameUser) {
        throw Error('Username already in use');
    }

    //hashed the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
 
    const user = await this.create({ email, username, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function(username, password){
   
    if (!password || !username) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
