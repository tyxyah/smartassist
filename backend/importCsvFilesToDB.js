const fs = require('fs');
const csvtojson = require('csvtojson');
const StudySchemeModel = require(`./models/202134Model`);

async function importStudySchemeCsvToDB(csvFilePath, user_id) {
    try {

        // Read the CSV file and convert it to JSON
        const jsonArray = await csvtojson().fromFile(csvFilePath);

        // Add the user_id to each row
        const jsonArrayWithUserId = jsonArray.map(row => ({ ...row, user_id }));

        // Insert the JSON data into the MongoDB collection
        await StudySchemeModel.insertMany(jsonArrayWithUserId, { validate: false });

        console.log('Study scheme import completed.');
    } catch (error) {
        console.error('Error during study scheme CSV import:', error);
    }
}

module.exports = { importStudySchemeCsvToDB };
