const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('./src/csv_files/2020_2021_12.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });