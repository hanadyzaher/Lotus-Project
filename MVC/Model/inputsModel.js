const db = require('./config');


// Function to get inputs by form ID using a promise
const getInputsByFormId = (formId) => {
    const sql = 'SELECT * FROM input WHERE formId = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [formId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  };
  
  module.exports = { getInputsByFormId };