const db = require('./config');

// Function to get a form by its ID using a promise
const getFormById = (formId) => {
  const sql = 'SELECT * FROM formsjson WHERE formId = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [formId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

module.exports = { getFormById };
