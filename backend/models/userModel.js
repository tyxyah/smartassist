const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

// define the data structure
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
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
userSchema.statics.signup = async function(email, password) {

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    //hashed the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
 
    const user = await this.create({ email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)
