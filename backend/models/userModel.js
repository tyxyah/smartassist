const mongoose = require('mongoose')

const Schema = mongoose.Schema

// define the data structure
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
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
        required: true
    },
}, { timestamps: true})

module.exports = mongoose.model('User', userSchema)
