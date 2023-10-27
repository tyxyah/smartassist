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
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Course', courseSchema)
