const mongoose = require("mongoose");

function connectToUserDatabase() {
  return mongoose.createConnection(process.env.MONGO_URI_USER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function connectToStudySchemeDatabase() {
  return mongoose.createConnection(process.env.MONGO_URI_STUDY_SCHEME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connectToUserDatabase,
  connectToStudySchemeDatabase,
};
