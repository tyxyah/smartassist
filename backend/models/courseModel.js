const mongoose = require('mongoose')

const Schema = mongoose.Schema

// define the data structure
const courseSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    credit_hrs: {
        type: Number,
        required: true
    },
    prerequisite: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Course', courseSchema)
