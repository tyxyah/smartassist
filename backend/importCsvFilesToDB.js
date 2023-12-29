const fs = require('fs');
const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const studySchemeModels = require('./models/studySchemeModel'); 

async function importStudySchemeCsvToDB(csvFilePath, user_id, start_session, muet) {
    try {
        // Determine the model based on start_session and muet
        const modelName = `StudyScheme${start_session}${muet}`;
        console.log(modelName)
        
        // Check if the model exists in Mongoose
        const StudySchemeModel = studySchemeModels[modelName];

        if (!StudySchemeModel) {
            throw new Error(`Model ${modelName} not found.`);
        }

        // Read the CSV file and convert it to JSON
        const jsonArray = await csvtojson().fromFile(csvFilePath);

        // Add the user_id to each row
        const jsonArrayWithUserId = jsonArray.map(row => ({ ...row, user_id }));

        // Insert the JSON data into the MongoDB collection
        await StudySchemeModel.insertMany(jsonArrayWithUserId, { validate: false });

        console.log('Study scheme import completed.');
    } catch (error) {
        console.error('Error during study scheme CSV import:', error);
        throw error; // Propagate the error to handle it appropriately in your application
    }
}

module.exports = { importStudySchemeCsvToDB };
