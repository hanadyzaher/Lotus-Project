const db = require('./config');

const getPageById = (pageId) => {
    const sql = 'SELECT * FROM pagejson WHERE pageId = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [pageId], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  };
  
  module.exports = { getPageById };