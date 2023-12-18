require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectToUserDatabase, connectToStudySchemeDatabase } = require('./db');

// invoke routes
const studentRoutes = require('./routes/student');
const SS202112Routes = require('./routes/202112');
const SS202134Routes = require('./routes/202134');
const SS202156Routes = require('./routes/202156');
const courseSuggestionRoute = require('./routes/suggestCourse');

// express app
const app = express();

// Allow requests
app.use(cors({ origin: 'http://localhost:3000' }));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Connect to databases
Promise.all([
  connectToUserDatabase(),
  connectToStudySchemeDatabase(),
])
  .then(() => {

    // routes
    app.use('/api/student', studentRoutes);
    app.use('/api/study_scheme/11', SS202112Routes);
    app.use('/api/study_scheme/12', SS202134Routes);
    app.use('/api/study_scheme/13', SS202156Routes);
    app.use('/api/suggest_course', courseSuggestionRoute);

    // listen for request
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Connected to databases and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to databases:', error);
  });



