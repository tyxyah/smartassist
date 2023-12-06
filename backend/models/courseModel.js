const mongoose = require('mongoose')

const Schema = mongoose.Schema

// define the data structure
const courseSchema = new Schema({
    semester_id: {
        type: Number,
        required: true
    },
    course_code: {
        type: String,
        required: false
    },
    course_name: {
        type: String,
        required: false
    },
    credit_hours: {
        type: String,
        required: true
    },
    prerequisite: {
        type: String,
        required: false
    },
    course_type: {
        type: Number,
        required: false
    }
}, { timestamps: true})

module.exports = mongoose.model('Course', courseSchema)
