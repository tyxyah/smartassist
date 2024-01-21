require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectToUserDatabase, connectToStudySchemeDatabase } = require('./db');

// invoke routes
const studentRoutes = require('./routes/student');
const studySchemeRoute = require('./routes/studyScheme');
const dashboardRoute = require('./routes/dashboard')

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
    app.use('/api/study_scheme', studySchemeRoute);
    app.use('/api/dashboard', dashboardRoute);

    // listen for request
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Connected to databases and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to databases:', error);
  });

  // otherFile.js

const { importStudySchemeCsvToDB } = require('./importCsvFilesToDB');

// Example usage:
const csvFilePath = './csv_files/1_2.csv'; // Replace with your actual CSV file path
//importStudySchemeCsvToDB(csvFilePath, "657192af7d5212f663ee4a3f" );

// Another file in your application

const removeManyDocuments = require('./deleteDocument');

// Replace with your MongoDB Atlas details
const uri = 'mongodb+srv://207704:OARS123@smartassist.nujj0n2.mongodb.net';
const dbName = 'study_scheme';
const collectionName = '1_2Model';
//const userId = '65acc7613a3d03bd88a459b2';

//Call the function to remove many documents for the specified user
//removeManyDocuments(uri, dbName, collectionName, userId)
  //.catch(console.error);



