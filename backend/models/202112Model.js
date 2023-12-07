const mongoose = require('mongoose')

const Schema = mongoose.Schema

// SS: Study Scheme, 2021: Session 2020/2021, 12: Muet 1/2 => SS202112
const SS202112_Schema = new Schema({
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
    },
    status: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('202112', SS202112_Schema)
