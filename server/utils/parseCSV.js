const fs = require('fs');
const csv = require('csv-parser');

function parseCSVtoTable(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        if (results.length === 0) {
          return reject(new Error("CSV file is empty or invalid."));
        }

        const headers = Object.keys(results[0]);
        let table = headers.join('\t') + '\n';

        results.forEach(row => {
          const rowData = headers.map(h => row[h]).join('\t');
          table += rowData + '\n';
        });

        resolve(table);
      })
      .on('error', (err) => {
        console.error("CSV Parsing Error:", err);
        reject(err);
      });
  });
}

module.exports = parseCSVtoTable;
