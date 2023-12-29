const mongoose = require('mongoose')
const { connectToStudySchemeDatabase } = require('../db');
const Schema = mongoose.Schema

// SS: Study Scheme, 2021: Session 2020/2021, 56: Muet 5/6 => SS202156
const SS202156_Schema = new Schema({
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
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

const studySchemeDB = connectToStudySchemeDatabase();
module.exports = studySchemeDB.model('1_3', SS202156_Schema)
