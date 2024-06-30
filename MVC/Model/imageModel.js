const db = require('./config');

const saveImage = (userId, filename, filepath) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO image (userId, filename, filepath) VALUES (?, ?, ?)';
    db.query(sql, [userId, filename, filepath], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { saveImage };
