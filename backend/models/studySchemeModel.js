const mongoose = require('mongoose');
const { connectToStudySchemeDatabase } = require('../db');
const Schema = mongoose.Schema;

const generateStudySchemeModel = (modelName, collectionName) => {
  const studySchemeSchema = new Schema({
    semester_id: {
      type: Number,
      required: true,
    },
    course_code: {
      type: String,
      required: false,
    },
    course_name: {
      type: String,
      required: false,
    },
    credit_hours: {
      type: String,
      required: true,
    },
    prerequisite: {
      type: String,
      required: false,
    },
    course_type: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  });

  const studySchemeDB = connectToStudySchemeDatabase();
  return studySchemeDB.model(modelName, studySchemeSchema, collectionName);
};

const StudyScheme11 = generateStudySchemeModel('StudyScheme11', '1_1Model');
const StudyScheme12 = generateStudySchemeModel('StudyScheme12', '1_2Model');
const StudyScheme13 = generateStudySchemeModel('StudyScheme13', '1_3Model');

module.exports = {
  StudyScheme11,
  StudyScheme12,
  StudyScheme13,
};
